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
        <a className="font-bold text-primary-dark underline" href="/">
          Go home
        </a>
      </div>
    </SecondaryShell>
  );
}
