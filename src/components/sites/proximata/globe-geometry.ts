// Pure geometry for the wireframe globe (the brand book's sphere glyph).
// Orthographic projection into a 0–1000 SVG viewBox; safe to run on the
// server so the first frame is part of the HTML.

export const GLOBE_VIEWBOX = 1000;
const CENTER = GLOBE_VIEWBOX / 2;
const RADIUS = 460;

const MERIDIAN_STEP = 20; // degrees between meridians
const PARALLELS = [-60, -30, 0, 30, 60];
const SAMPLE_STEP = 4; // degrees between sampled points along a line

const DEG = Math.PI / 180;

type Point = { x: number; y: number; z: number };

export type GlobeFrame = {
  /** Path data for lines on the visible hemisphere. */
  front: string;
  /** Path data for lines on the far hemisphere. */
  back: string;
  /** Projected marker position; z > 0 means facing the viewer. */
  marker: Point;
};

/** Project latitude/longitude onto the tilted, spun sphere. */
function project(lat: number, lon: number, spin: number, tilt: number): Point {
  const phi = lat * DEG;
  const lambda = (lon + spin) * DEG;
  const t = tilt * DEG;
  const x0 = Math.cos(phi) * Math.sin(lambda);
  const y0 = Math.sin(phi);
  const z0 = Math.cos(phi) * Math.cos(lambda);
  const y = y0 * Math.cos(t) - z0 * Math.sin(t);
  const z = y0 * Math.sin(t) + z0 * Math.cos(t);
  return { x: CENTER + RADIUS * x0, y: CENTER - RADIUS * y, z };
}

const fmt = (v: number) => v.toFixed(1);

/** Append a sampled line to the front/back path strings, splitting where it crosses the limb. */
function addLine(points: Point[], front: string[], back: string[]) {
  let previousSide: boolean | null = null;
  for (const p of points) {
    const facing = p.z >= 0;
    const target = facing ? front : back;
    target.push(`${previousSide === facing ? "L" : "M"}${fmt(p.x)} ${fmt(p.y)}`);
    previousSide = facing;
  }
}

export function buildGlobeFrame(
  spin: number,
  tilt: number,
  marker: { lat: number; lon: number },
): GlobeFrame {
  const front: string[] = [];
  const back: string[] = [];

  for (let lon = 0; lon < 360; lon += MERIDIAN_STEP) {
    const points: Point[] = [];
    for (let lat = -90; lat <= 90; lat += SAMPLE_STEP) points.push(project(lat, lon, spin, tilt));
    addLine(points, front, back);
  }

  for (const lat of PARALLELS) {
    const points: Point[] = [];
    for (let lon = 0; lon <= 360; lon += SAMPLE_STEP) points.push(project(lat, lon, spin, tilt));
    addLine(points, front, back);
  }

  return {
    front: front.join(""),
    back: back.join(""),
    marker: project(marker.lat, marker.lon, spin, tilt),
  };
}

export const GLOBE_RADIUS = RADIUS;
export const GLOBE_CENTER = CENTER;
