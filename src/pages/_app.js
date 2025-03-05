import { BaseLayout } from '../components/layout/BaseLayout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}

export default MyApp;

