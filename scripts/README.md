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

2. **Create a Service Account (Recommended):**

   ```bash
   # Get your project ID
   PROJECT_ID=$(gcloud config get-value project)
   
   # Create service account
   gcloud iam service-accounts create resume-sync \
     --display-name="Resume Sync Service Account"
   
   # Grant necessary permissions
   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member="serviceAccount:resume-sync@$PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/storage.objectAdmin"
   
   # Create and download key
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

### Cloud Run Prerequisites

1. **Create a service account for Cloud Run** (different from the resume-sync account):

   ```bash
   PROJECT_ID=$(gcloud config get-value project)
   
   # Create service account for Cloud Run
   gcloud iam service-accounts create resume-sync-cloud-run \
     --display-name="Resume Sync Cloud Run Service Account"
   
   # Grant Drive and Storage permissions
   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member="serviceAccount:resume-sync-cloud-run@$PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/storage.objectAdmin"
   
   # Note: Drive access is granted by sharing the document with this service account
   ```

2. **Share the Google Doc with the Cloud Run service account:**

   ```bash
   # Get the service account email
   echo "resume-sync-cloud-run@$PROJECT_ID.iam.gserviceaccount.com"
   ```

   Then share the document (https://docs.google.com/document/d/1dCjS-eKJHf3cN0TzwsNiEjXVhKNUPAWat6mG1o53lwM) with this email address.

### Deploy to Cloud Run

The scripts service is automatically deployed to Cloud Run via GitHub Actions when you push to the `main` branch (see `.github/workflows/deploy.yaml`).

The service is deployed as a private Cloud Run service (no public access) using the `resume-sync-cloud-run` service account.

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
