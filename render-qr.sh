#!/usr/bin/env bash
# ============================================================================
#  render-qr.sh — generate releases/download-qr.svg pointing at the APK
#  download URL on GitHub. Run from inside a spawned wrapper repo.
# ============================================================================
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SLUG="$(basename "$DIR" | sed 's/-android$//')"
URL="${QR_URL:-https://github.com/abourdim/${SLUG}-android/releases/latest}"
OUT="$DIR/releases/download-qr.svg"

mkdir -p "$DIR/releases"

python3 - <<PY
import qrcode, qrcode.image.svg
img = qrcode.make("$URL", image_factory=qrcode.image.svg.SvgPathImage)
img.save("$OUT")
print("  ✓ QR → $OUT  (target: $URL)")
PY
