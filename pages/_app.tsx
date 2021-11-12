import "../styles/globals.css";
import type { AppProps } from "next/app";

function PagesContainer({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}

export default PagesContainer;
