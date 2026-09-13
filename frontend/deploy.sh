#!/bin/bash
set -e

# Config
gcloud config set account granttimmerman@gmail.com

SERVICE=""
if [[ "${RUN_ENV}" == "PROD" ]]; then
  # Disable update check to avoid prompt
  gcloud config set component_manager/disable_update_check true
  SERVICE="grantcm"
else
  # Default to staging
  SERVICE="grantcm-staging"
fi
echo "Deploying to project: ${SERVICE}"

# Deploy to Cloud Run. The app is built by Google Cloud's Node.js buildpacks
# during the deploy (they run the "build" script automatically), so there is
# no need to build locally first.
gcloud run deploy "$SERVICE" \
  --project grantcm \
  --region us-central1 \
  --source . \
  --allow-unauthenticated
