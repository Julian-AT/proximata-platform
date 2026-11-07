// Builds the RGBA heightmap the Logo Glass shader samples, following the
// algorithm in Framer's shader runtime:
//   r = smooth "soap bubble" height inside the shape (Poisson solve, SOR),
//       normalised by the tallest point of the whole image
//   g = 255 - source alpha
//   b = 255 inside the shape, 0 outside
// The result is resampled back to the image's natural size.

const WORK_SIZE = 1024;
const ITERATIONS = 50;
const OMEGA = 1.95;
const SOURCE = 0.01;

function solveHeight(interior: Uint8Array, width: number, height: number) {
  const size = width * height;
  const field = new Float32Array(size);
  const red: number[] = [];
  const black: number[] = [];

  for (let i = 0; i < size; i++) {
    if (interior[i] === 0) continue;
    const x = i % width;
    const y = Math.floor(i / width);
    ((x + y) % 2 === 0 ? red : black).push(
      i,
      y > 0 ? i - width : -1,
      y < height - 1 ? i + width : -1,
      x > 0 ? i - 1 : -1,
      x < width - 1 ? i + 1 : -1,
    );
  }

  const passes = [Int32Array.from(red), Int32Array.from(black)];
  const keep = 1 - OMEGA;
  const weight = OMEGA / 4;

  for (let iteration = 0; iteration < ITERATIONS; iteration++) {
    for (const pass of passes) {
      for (let k = 0; k < pass.length; k += 5) {
        const at = pass[k];
        const up = pass[k + 1] >= 0 ? field[pass[k + 1]] : 0;
        const down = pass[k + 2] >= 0 ? field[pass[k + 2]] : 0;
        const left = pass[k + 3] >= 0 ? field[pass[k + 3]] : 0;
        const right = pass[k + 4] >= 0 ? field[pass[k + 4]] : 0;
        field[at] = keep * field[at] + weight * (SOURCE + up + down + left + right);
      }
    }
  }

  return field;
}

export function buildHeightmap(image: HTMLImageElement): HTMLCanvasElement | null {
  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;
  if (!naturalWidth || !naturalHeight) return null;

  let scale = WORK_SIZE / Math.min(naturalWidth, naturalHeight);
  const maxArea = WORK_SIZE * WORK_SIZE;
  const area = naturalWidth * scale * (naturalHeight * scale);
  if (area > maxArea) scale *= Math.sqrt(maxArea / area);
  const width = Math.max(1, Math.round(naturalWidth * scale));
  const height = Math.max(1, Math.round(naturalHeight * scale));

  const work = document.createElement("canvas");
  work.width = width;
  work.height = height;
  const workCtx = work.getContext("2d", { willReadFrequently: true });
  if (!workCtx) return null;
  workCtx.drawImage(image, 0, 0, width, height);
  const pixels = workCtx.getImageData(0, 0, width, height).data;

  const size = width * height;
  const inside = new Uint8Array(size);
  for (let i = 0; i < size; i++) inside[i] = pixels[i * 4 + 3] > 0 ? 1 : 0;

  // Interior = inside pixels whose 8 neighbours are all inside.
  const interior = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    if (!inside[i]) continue;
    const x = i % width;
    const y = Math.floor(i / width);
    if (x === 0 || x === width - 1 || y === 0 || y === height - 1) continue;
    let edge = false;
    for (let dy = -1; dy <= 1 && !edge; dy++) {
      for (let dx = -1; dx <= 1 && !edge; dx++) {
        if ((dx !== 0 || dy !== 0) && !inside[(y + dy) * width + (x + dx)]) edge = true;
      }
    }
    if (!edge) interior[i] = 1;
  }

  const field = solveHeight(interior, width, height);
  let max = 0;
  for (let i = 0; i < size; i++) if (field[i] > max) max = field[i];

  const map = document.createElement("canvas");
  map.width = width;
  map.height = height;
  const mapCtx = map.getContext("2d");
  if (!mapCtx) return null;
  const data = mapCtx.createImageData(width, height);
  for (let i = 0; i < size; i++) {
    const h = max > 0 ? field[i] / max : 0;
    data.data[i * 4] = Math.round(h * 255);
    data.data[i * 4 + 1] = 255 - pixels[i * 4 + 3];
    data.data[i * 4 + 2] = inside[i] ? 255 : 0;
    data.data[i * 4 + 3] = 255;
  }
  mapCtx.putImageData(data, 0, 0);

  const out = document.createElement("canvas");
  out.width = naturalWidth;
  out.height = naturalHeight;
  const outCtx = out.getContext("2d");
  if (!outCtx) return null;
  outCtx.imageSmoothingEnabled = true;
  outCtx.drawImage(map, 0, 0, naturalWidth, naturalHeight);
  return out;
}

const cache = new Map<string, Promise<HTMLCanvasElement | null>>();

/** Loads an image and builds its heightmap once per URL. */
export function loadHeightmap(src: string) {
  let pending = cache.get(src);
  if (!pending) {
    pending = new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Failed to load ${src}`));
      image.src = src;
    }).then(buildHeightmap);
    cache.set(src, pending);
  }
  return pending;
}
