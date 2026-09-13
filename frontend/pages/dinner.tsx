import SecondaryShell from '../components/secondaryShell';

// A page with an iframe to dinner.
// http://localhost:8080/dinner
export default function Dinner() {
  return (
    <SecondaryShell title="Dinner" fullBleed>
      <iframe
        title="Dinner"
        className="h-full min-h-[calc(100vh-158px)] w-full border-0"
        src="https://grant.github.io/dinner"
      />
    </SecondaryShell>
  );
}
