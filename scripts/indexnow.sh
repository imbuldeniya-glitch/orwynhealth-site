#!/usr/bin/env bash
# Tell IndexNow (Bing, and through it ChatGPT and Copilot search) about every page in sitemap.xml.
# Run once the Vercel deploy is live. Usage: scripts/indexnow.sh
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="orwynhealth.com"
KEYFILE=$(ls | grep -E '^[0-9a-f]{32}\.txt$' | head -n 1)
if [ -z "$KEYFILE" ]; then echo "No IndexNow key file found at the site root." >&2; exit 1; fi
KEY="${KEYFILE%.txt}"

URLS=$(grep -o '<loc>[^<]*</loc>' sitemap.xml | sed -e 's#<loc>##' -e 's#</loc>##')
JSON=$(python3 - "$HOST" "$KEY" $URLS <<'PY'
import json, sys
host, key, *urls = sys.argv[1:]
print(json.dumps({"host": host, "key": key,
                  "keyLocation": f"https://{host}/{key}.txt", "urlList": urls}))
PY
)

echo "Submitting $(echo "$URLS" | wc -l | tr -d ' ') URLs to IndexNow"
STATUS=$(curl -s -o /dev/null -w '%{http_code}' -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" --data "$JSON")
echo "HTTP status: $STATUS"
