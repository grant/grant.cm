import SecondaryShell from '../components/secondaryShell';

// A page with an iframe to resume.
// http://localhost:8080/resume
export default function Resume() {
  return (
    <SecondaryShell title="Resume" fullBleed>
      <iframe
        title="Grant Timmerman's Resume"
        className="h-full min-h-[calc(100vh-158px)] w-full border-0"
        src="https://storage.googleapis.com/granttimmerman-resume/Grant_Timmerman_Resume.pdf"
      />
    </SecondaryShell>
  );
}
