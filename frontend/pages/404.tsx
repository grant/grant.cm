import Error from '../components/error';

// https://nextjs.org/docs/advanced-features/custom-error-page#404-page
export default function Custom404() {
  return <Error errorCode="404" errorMessage="This page does not exist." />;
}
