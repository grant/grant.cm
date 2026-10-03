export const WATERSF_APP_URL =
  'https://watersf-166145790296.us-central1.run.app';

// Public path for the live watersf app.
// https://grant.cm/watersf
export async function getServerSideProps() {
  return {
    redirect: {
      destination: WATERSF_APP_URL,
      permanent: false,
    },
  };
}

export default function Watersf() {
  return null;
}
