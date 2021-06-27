# grant.cm

The frontend for grant.cm.

## Quickstart

To develop the frontend HTML/CSS/JS, use the `dev` script:

```
npm run dev
```

Then go to `localhost:3000`.

## Scripts

- `dev`: Starts development mode.
- `build`: Creates a static build.
- `start`: Starts the server with a static build.
- `lint`: Runs a linter.
- `clean`: Cleans output.
- `fix`: Tries to fix lint issues.
- `deploy`: Manually deploys to Cloud Run.

### Setup a service account

To automatically deploy with GitHub Actions, set up a service account and IAM with this script:

```sh
# Configuration
PROJECT=grantcm

# Create SA
PROJECT_NUMBER=$(gcloud projects list \
  --filter="project_id:$PROJECT" \
  --format='value(project_number)')
SA_ID=grantcm-sa
gcloud iam service-accounts create $SA_ID \
--display-name="deploy-grantcm"

# Add roles to SA
gcloud projects add-iam-policy-binding $PROJECT \
--member="serviceAccount:$SA_ID@$PROJECT.iam.gserviceaccount.com" \
--role="roles/run.admin"
gcloud projects add-iam-policy-binding $PROJECT \
--member="serviceAccount:$SA_ID@$PROJECT.iam.gserviceaccount.com" \
--role="roles/iam.serviceAccountUser"
gcloud projects add-iam-policy-binding $PROJECT \
--member="serviceAccount:$SA_ID@$PROJECT.iam.gserviceaccount.com" \
--role="roles/storage.admin"
gcloud projects add-iam-policy-binding $PROJECT \
--member="serviceAccount:$SA_ID@$PROJECT.iam.gserviceaccount.com" \
--role="roles/artifactregistry.reader"

# Add roles to Cloud Build
## Grant the Cloud Run Admin role to the Cloud Build service account
gcloud projects add-iam-policy-binding $PROJECT \
  --member "serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
  --role roles/run.admin
## Grant the IAM Service Account User role to the Cloud Build service account on the Cloud Run runtime service account
gcloud iam service-accounts add-iam-policy-binding \
  $PROJECT_NUMBER-compute@developer.gserviceaccount.com \
  --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Create and download credentials for the service account
gcloud iam service-accounts keys create creds.json \
--iam-account $SA_ID@$PROJECT.iam.gserviceaccount.com

# Copy SA to clipboard
cat creds.json | pbcopy

gh secret set GCP_SA_KEY < creds.json
rm creds.json
```

Then future pushes to the default branch will cause a deploy.
