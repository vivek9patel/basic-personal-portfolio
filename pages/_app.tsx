import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Context from "../context";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const [currentLink, setCurrentLink] = useState("");
  const clientRouter = useRouter();
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  useEffect(() => {
    setCurrentLink(clientRouter.pathname.split("/")[1]);
  }, [clientRouter.pathname]);

  return (
    <Context>
      <Header loading={loading} currentLink={currentLink} />
      <Component {...pageProps} />
    </Context>
  );
}

export default MyApp;
