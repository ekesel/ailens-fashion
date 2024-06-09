import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.css'
import { Poppins } from 'next/font/google'

import { useEffect } from "react";

const poppins = Poppins({ subsets: ['latin'],
  weight: ['200','400', '600', '700', '800', '300'],
 })
 

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  );
}