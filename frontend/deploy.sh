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

# Deploys the web app to Cloud Run
gcloud config set project grantcm
gcloud beta run deploy $SERVICE \
--region us-central1 \
--source . \
--allow-unauthenticated;