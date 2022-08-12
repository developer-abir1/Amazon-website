import '../styles/globals.css';
import { StoreProvider } from '../utils/store';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </StoreProvider>
  );
}

export default MyApp;
