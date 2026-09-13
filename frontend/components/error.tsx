import SecondaryShell from './secondaryShell';

export default function Error({
  errorMessage,
  errorCode,
}: {
  errorMessage: string;
  errorCode: string;
}) {
  return (
    <SecondaryShell title={`${errorCode} error`}>
      <div className="max-w-2xl rounded-xl border border-muted bg-white p-10 shadow-sm">
        <p className="mb-3 text-large font-bold text-primary-dark">
          {errorCode}
        </p>
        <h2 className="mb-8 text-xlarge font-bold">{errorMessage}</h2>
        <a
          className="inline-flex rounded-md bg-primary px-4 py-2 font-bold text-white transition hover:bg-primary-dark"
          href="/"
        >
          Go home
        </a>
      </div>
    </SecondaryShell>
  );
}
