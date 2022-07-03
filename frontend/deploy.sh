#!/bin/bash

# Config
gcloud config set account granttimmerman@gmail.com

SERVICE=""
if [[ "${RUN_ENV}" == "PROD" ]]; then
  SERVICE="grantcm"
else
  # Default to staging
  SERVICE="grantcm-staging"
fi
echo "Deploying to project: ${SERVICE}"

# Build the app
npm run build;

buildStatus=$?

if [[ $buildStatus -eq 0 ]]; then
  echo "!!! Build successful !!!"

  # Deploys the web app to Cloud Run
  gcloud beta run deploy $SERVICE \
  --project grantcm \
  --region us-central1 \
  --source . \
  --allow-unauthenticated;
else
  echo "!!! Build failed. Fix build then redeploy !!!"
fi
