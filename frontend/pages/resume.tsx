// A page with an iframe to resume.
// http://localhost:8080/resume
export default function Resume() {
  return (
    // https://console.cloud.google.com/storage/browser/granttimmerman-resume;tab=objects?forceOnBucketsSortingFiltering=false&project=grantcm&prefix=&forceOnObjectsSortingFiltering=false
    <iframe src="https://storage.googleapis.com/granttimmerman-resume/Grant_Timmerman_Resume.pdf" />
  );
}
