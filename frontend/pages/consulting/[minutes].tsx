import SecondaryShell from '../../components/secondaryShell';
import {useEffect} from 'react';

export default function Consulting({minutes}: {minutes: string}) {
  const stripeLinks: {[key: string]: string} = {
    '15': 'https://buy.stripe.com/00gaGGdtw7v2eWIdQW',
    '30': 'https://buy.stripe.com/eVa7uuexAaHedSEbIN',
    '60': 'https://buy.stripe.com/dR6dSSdtwg1yeWI148',
  };

  useEffect(() => {
    if (stripeLinks[minutes]) {
      window.location.href = stripeLinks[minutes];
    }
  }, [minutes]);

  // Show error for invalid paths if no valid stripe link
  if (!stripeLinks[minutes]) {
    const availableDurations = Object.keys(stripeLinks).join(', ');

    return (
      <SecondaryShell title="Consulting">
        <div className="rounded-lg border border-muted bg-white p-6 text-lg text-gray-dark">
          Invalid consultation duration. Please choose {availableDurations}{' '}
          minutes.
        </div>
      </SecondaryShell>
    );
  }

  return (
    <SecondaryShell title="Redirecting to checkout">
      <p className="text-gray-dark">Opening secure checkout…</p>
    </SecondaryShell>
  );
}

// Add getServerSideProps to get the minutes parameter
export async function getServerSideProps({
  params,
}: {
  params: {minutes: string};
}) {
  return {
    props: {
      minutes: params.minutes,
    },
  };
}
