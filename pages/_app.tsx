import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function PagesContainer({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}

export default PagesContainer;
