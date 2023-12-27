// TODO: Delete SCSS
import '../styles/reset.scss';
import '../styles/global.scss';

import '../styles/globals.css';
import {AppProps} from 'next/app';

/**
 * The base component for the whole app.
 */
export default function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
