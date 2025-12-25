#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

if [[ -z "${MINIO_ROOT_USER:-}" || -z "${MINIO_ROOT_PASSWORD:-}" ]]; then
  echo "MINIO_ROOT_USER and MINIO_ROOT_PASSWORD must be set (infra/.env)." >&2
  exit 1
fi

NETWORK_NAME="$(docker inspect -f '{{range $k, $v := .NetworkSettings.Networks}}{{println $k}}{{end}}' minio | head -n 1)"

if [[ -z "$NETWORK_NAME" ]]; then
  echo "Could not detect the Docker network for the minio container." >&2
  exit 1
fi

docker run --rm --network "$NETWORK_NAME" minio/mc \
  alias set local http://minio:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD"

docker run --rm --network "$NETWORK_NAME" minio/mc \
  mb --ignore-existing local/public-media

docker run --rm --network "$NETWORK_NAME" minio/mc \
  anonymous set download local/public-media

echo "MinIO bucket public-media ready (public read)."
