/**
 * Syncs a Google Doc resume to Google Cloud Storage as a PDF.
 *
 * Authentication options:
 * 1. Service Account (recommended): Set GOOGLE_APPLICATION_CREDENTIALS env var to path of service account key JSON
 * 2. Application Default Credentials: Run `gcloud auth application-default login`
 *
 * For service account setup:
 * 1. Create a service account in Google Cloud Console
 * 2. Download the JSON key file
 * 3. Share the Google Doc with the service account email (found in the JSON file)
 * 4. Set GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
 */

import { google } from "googleapis";
import { Storage } from "@google-cloud/storage";
import { Readable } from "stream";

const DOCUMENT_ID = "1dCjS-eKJHf3cN0TzwsNiEjXVhKNUPAWat6mG1o53lwM";
const BUCKET_NAME = "granttimmerman-resume";
const DESTINATION_BLOB = "Grant_Timmerman_Resume.pdf";

export async function syncGoogleDocResume() {
  // Authenticate - supports both service account key file and ADC
  let auth;
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (keyFile) {
    // Use service account key file
    console.log(`🔑 Using service account key: ${keyFile}`);
    auth = new google.auth.GoogleAuth({
      keyFile: keyFile,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
  } else {
    // Use Application Default Credentials
    auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
  }

  const drive = google.drive({ version: "v3", auth });

  // Get the authenticated account email
  let email = "unknown";
  try {
    if (keyFile) {
      // For service account, read the email from the key file
      const keyData = require(keyFile);
      email = keyData.client_email || "unknown";
      console.log(`🔐 Authenticated as service account: ${email}`);
    } else {
      // For user account, get from Drive API
      const about = await drive.about.get({ fields: "user" });
      email = about.data.user?.emailAddress || "unknown";
      console.log(`🔐 Authenticated as: ${email}`);
    }
  } catch (err) {
    console.log("🔐 Authenticated (could not retrieve email)");
  }
  console.log(`📄 Accessing document: ${DOCUMENT_ID}`);

  const storage = new Storage(keyFile ? { keyFilename: keyFile } : {});

  console.log("📥 Downloading Google Doc as PDF...");
  const res = await drive.files.export(
    {
      fileId: DOCUMENT_ID,
      mimeType: "application/pdf",
    },
    { responseType: "arraybuffer" },
  );

  // Convert response to a stream for upload
  const pdfBuffer = Buffer.from(res.data as ArrayBuffer);
  const stream = Readable.from(pdfBuffer);

  console.log("☁️ Uploading to Google Cloud Storage...");
  const bucket = storage.bucket(BUCKET_NAME);
  const file = bucket.file(DESTINATION_BLOB);
  await new Promise<void>((resolve, reject) => {
    stream
      .pipe(file.createWriteStream({ contentType: "application/pdf" }))
      .on("finish", resolve)
      .on("error", reject);
  });

  console.log(`✅ Uploaded to gs://${BUCKET_NAME}/${DESTINATION_BLOB}`);
}

// Run as CLI script if executed directly
if (require.main === module) {
  syncGoogleDocResume().catch((err) => {
    if (err.message?.includes("Could not load the default credentials")) {
      console.error("❌ Authentication Error:");
      console.error("   Please run: gcloud auth application-default login");
      console.error(
        "   For more info: https://cloud.google.com/docs/authentication/getting-started",
      );
    } else if (
      err.status === 403 ||
      err.message?.includes("Insufficient Permission") ||
      err.code === 403
    ) {
      console.error("❌ Permission Error:");
      console.error(
        "   The Google Doc is not accessible with your current credentials.",
      );
      console.error("   Solutions:");
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        console.error(
          "   Using service account - share the document with the service account email.",
        );
        console.error(
          `   Document: https://docs.google.com/document/d/${DOCUMENT_ID}`,
        );
        try {
          const keyData = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
          console.error(`   Service account email: ${keyData.client_email}`);
        } catch (e) {
          // Ignore if we can't read the key file
        }
      } else {
        console.error("   1. Use a service account (recommended):");
        console.error("      - Create service account in Google Cloud Console");
        console.error("      - Download JSON key file");
        console.error(
          "      - Set: export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json",
        );
        console.error("      - Share document with service account email");
        console.error("   2. Or re-authenticate with your account:");
        console.error("      gcloud auth application-default login");
        console.error(
          `   Document: https://docs.google.com/document/d/${DOCUMENT_ID}`,
        );
      }
    } else {
      console.error("❌ Error:", err);
    }
    process.exit(1);
  });
}
