#!/bin/bash

# Config
gcloud config set account granttimmerman@gmail.com

PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="resume-sync"
REGION="us-central1"

echo "Deploying scripts service to Cloud Run..."
echo "Project: $PROJECT_ID"
echo "Service: $SERVICE_NAME"
echo "Region: $REGION"

# Deploy to Cloud Run
gcloud run deploy $SERVICE_NAME \
  --project $PROJECT_ID \
  --region $REGION \
  --source . \
  --service-account resume-sync-cloud-run@$PROJECT_ID.iam.gserviceaccount.com \
  --no-allow-unauthenticated

