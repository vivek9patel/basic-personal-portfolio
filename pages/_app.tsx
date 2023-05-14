import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Context from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <Header />
      <Component {...pageProps} />
    </Context>
  );
}

export default MyApp;
