import Error from '../components/error';

// https://nextjs.org/docs/advanced-features/custom-error-page#500-page
export default function Custom500() {
  return <Error errorCode="500" errorMessage="Server-side error occurred." />;
}
