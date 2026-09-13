import SecondaryShell from '../../components/secondaryShell';

// A page with my Google Calendar.
// http://localhost:8080/cal
export default function Cal() {
  return (
    <SecondaryShell title="Calendar" fullBleed>
      <iframe
        title="Grant Timmerman's Calendar"
        className="h-full min-h-[calc(100vh-158px)] w-full border-0"
        src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;mode=WEEK&amp;wkst=1&amp;bgcolor=%23f7f4ef&amp;src=granttimmerman%40gmail.com&amp;color=%232952A3&amp;ctz=America%2FLos_Angeles&output=embed"
      />
    </SecondaryShell>
  );
}
