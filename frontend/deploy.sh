#!/bin/bash

# Config
gcloud config set account granttimmerman@gmail.com

SERVICE=grantcm-staging;
# SERVICE=grantcm;

# Build the app
npm run build;

# Deploys the web app to Cloud Run
gcloud config set project grantcm
gcloud beta run deploy $SERVICE \
--region us-central1 \
--source . \
--allow-unauthenticated;