import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";

function PagesContainer({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main>
      <Provider session={session}>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}

export default PagesContainer;
