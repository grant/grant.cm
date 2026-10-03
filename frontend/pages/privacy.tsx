import SecondaryShell from '../components/secondaryShell';

// A short privacy policy for the Google OAuth consent screen.
// https://grant.cm/privacy
export default function Privacy() {
  return (
    <SecondaryShell title="Privacy">
      <div className="max-w-3xl">
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-dark">
          This is my personal site.
        </p>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-dark">
          Separately, I use Google OAuth to read my own Google Health
          data—activity and fitness, health metrics and measurements, and sleep.
          Access is read-only. I store that data in a private bucket I control.
          I do not sell it, use it for ads, or share it with other people.
        </p>
        <p className="text-gray-dark">
          Questions?{' '}
          <a
            className="font-bold text-primary-dark underline"
            href="mailto:granttimmerman@gmail.com"
          >
            Email me
          </a>
          .
        </p>
      </div>
    </SecondaryShell>
  );
}
