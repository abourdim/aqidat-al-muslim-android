#!/usr/bin/env bash
# ============================================================================
#  render-assets.sh — turn store-assets/*.html into PNG via headless Chromium
#
#  Usage:  ./render-assets.sh
#  Run from inside a spawned wrapper repo.
# ============================================================================
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SA="$DIR/store-assets"

# Find a chromium-flavored binary
CHROME=""
for c in chromium chromium-browser google-chrome chrome; do
  if command -v "$c" >/dev/null; then CHROME="$c"; break; fi
done
[ -z "$CHROME" ] && { echo "✗ no chromium/chrome found — install one then rerun"; exit 1; }

render() {
  local html="$1" png="$2" w="$3" h="$4"
  echo "→ rendering $(basename "$html") @ ${w}x${h}"
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --window-size="${w},${h}" --screenshot="$png" \
    "file://$html" >/dev/null 2>&1
  echo "  ✓ $png"
}

render "$SA/feature-graphic.html"        "$SA/feature-graphic.png"        1024 500
render "$SA/play-store-icon-512.html"    "$SA/play-store-icon-512.png"     512 512

# QR code for landing-page download tile
if [ -x "$DIR/render-qr.sh" ]; then
  "$DIR/render-qr.sh" || echo "  ! QR render skipped (python3 + qrcode lib needed)"
fi

echo
echo "Done. PNGs + QR ready."
