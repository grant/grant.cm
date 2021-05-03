#!/bin/bash

# Deploys the web app to Cloud Run
gcloud config set project grantcm
gcloud beta run deploy grantcm \
--source . \
--allow-unauthenticated
