# Scripts

Scripts and various utilities.

## Update Medium

Updates the JSON from Medium.com

```sh
npm run updateMediumData
```

## Sync Google Doc Resume

Syncs a Google Doc resume to Google Cloud Storage as a PDF.

### Setup

1. Enable APIs in your Google Cloud project:

   ```bash
   gcloud services enable drive.googleapis.com storage.googleapis.com
   ```

2. **Create a Service Account:**

   ```bash
   # Get your project ID
   PROJECT_ID=$(gcloud config get-value project)
   
   # Create service account (used for both local development and Cloud Run)
   gcloud iam service-accounts create resume-sync \
     --display-name="Resume Sync Service Account"
   
   # Grant necessary permissions
   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member="serviceAccount:resume-sync@$PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/storage.objectAdmin"
   
   # Grant GitHub Actions service account permission to act as this service account
   # (Required for Cloud Run deployment)
   gcloud iam service-accounts add-iam-policy-binding resume-sync@$PROJECT_ID.iam.gserviceaccount.com \
     --member="serviceAccount:grantcm-sa@$PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/iam.serviceAccountUser"

   # Create and download key for local development
   gcloud iam service-accounts keys create ~/resume-sync-key.json \
     --iam-account=resume-sync@$PROJECT_ID.iam.gserviceaccount.com
   ```

3. **Share the Google Doc with the service account:**

   Get the service account email:

   ```bash
   # Using jq (if installed)
   SERVICE_ACCOUNT_EMAIL=$(jq -r '.client_email' ~/resume-sync-key.json)
   echo "Service account email: $SERVICE_ACCOUNT_EMAIL"
   ```

   Then:
   - Open the Google Doc: https://docs.google.com/document/d/1dCjS-eKJHf3cN0TzwsNiEjXVhKNUPAWat6mG1o53lwM
   - Click "Share"
   - Add the service account email: `$SERVICE_ACCOUNT_EMAIL`
   - Give it "Viewer" access

4. **Set the service account key path:**

   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS=~/resume-sync-key.json
   ```

5. Run the script locally:

   ```bash
   just scripts sync-resume
   ```

## Deploy to Cloud Run

Deploy the script as a private Cloud Run service that can be triggered by Cloud Scheduler.

**Note:** The same service account (`resume-sync`) created in step 2 above is used for both local development and Cloud Run. Make sure you've completed the setup steps above, including sharing the Google Doc with the service account.

### Deploy to Cloud Run

The scripts service is automatically deployed to Cloud Run via GitHub Actions when you push to the `main` branch (see `.github/workflows/deploy.yaml`).

The service is deployed as a private Cloud Run service (no public access) using the `resume-sync` service account.

### Set Up Cloud Scheduler

Create a Cloud Scheduler job to trigger the sync periodically (e.g., daily):

```bash
PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="resume-sync"
REGION="us-central1"
SCHEDULER_NAME="resume-sync-daily"

# Get the Cloud Run service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
  --region $REGION \
  --format 'value(status.url)')

# Create a service account for Cloud Scheduler
gcloud iam service-accounts create resume-sync-scheduler \
  --display-name="Resume Sync Scheduler Service Account"

# Grant the scheduler service account permission to invoke Cloud Run
gcloud run services add-iam-policy-binding $SERVICE_NAME \
  --region $REGION \
  --member="serviceAccount:resume-sync-scheduler@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.invoker"

# Create the Cloud Scheduler job (runs daily at 2 AM UTC)
gcloud scheduler jobs create http $SCHEDULER_NAME \
  --location $REGION \
  --schedule="0 2 * * *" \
  --uri="$SERVICE_URL/sync-resume" \
  --http-method=POST \
  --oidc-service-account-email="resume-sync-scheduler@$PROJECT_ID.iam.gserviceaccount.com" \
  --project $PROJECT_ID
```

### Manual Trigger

You can manually trigger the sync by invoking the Cloud Run service:

```bash
PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="resume-sync"
REGION="us-central1"

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
  --region $REGION \
  --format 'value(status.url)')

# Get an identity token
TOKEN=$(gcloud auth print-identity-token)

# Trigger the sync
curl -X POST "$SERVICE_URL/sync-resume" \
  -H "Authorization: Bearer $TOKEN"
```

### View Logs

```bash
gcloud run services logs read resume-sync \
  --region us-central1 \
  --limit 50
```
