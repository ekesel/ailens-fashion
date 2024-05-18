import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.css'

import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}