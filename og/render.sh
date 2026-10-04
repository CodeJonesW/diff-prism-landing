#!/bin/sh
# Renders og/og-image.html to public/og-image.png (1200x630), the link-preview
# image that index.html and vite.config.ts point at. Needs Google Chrome; set
# CHROME to its binary if it isn't at the macOS default path.
#
# Social platforms cache preview images by URL. After changing the image, bump
# the ?v= on og:image/twitter:image in index.html and DEFAULT_IMAGE in vite.config.ts.
set -eu
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=10000 \
  --allow-file-access-from-files \
  --screenshot="$PWD/public/og-image.png" "file://$PWD/og/og-image.html"
