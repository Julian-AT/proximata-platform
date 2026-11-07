#!/usr/bin/env bash
# Download the confer.framer.website assets listed in confer-assets.tsv
# into public/sites/confer/. Re-runnable: existing files are skipped.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MANIFEST="$ROOT/scripts/confer-assets.tsv"
DEST="$ROOT/public/sites/confer"

while IFS=$'\t' read -r url path; do
  [[ -z "$url" || "$url" == \#* ]] && continue
  out="$DEST/$path"
  if [[ -s "$out" ]]; then
    continue
  fi
  mkdir -p "$(dirname "$out")"
  curl -fsSL --retry 3 -o "$out" "$url"
  echo "fetched $path"
done < "$MANIFEST"
