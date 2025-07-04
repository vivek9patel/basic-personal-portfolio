import Document, { Html, Head, Main, NextScript } from 'next/document';
import MetaTags from '../components/meta/MetaTags';
import { Analytics } from '@vercel/analytics/react';

class MyDocument extends Document {
  render() {
    return (
      <Html suppressHydrationWarning>
        <Head>
          <MetaTags />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
          ></link>
        </Head>
        <body className="transition-colors duration-300 custom-scroll-bar-x">
          <Main />
          <NextScript />
        </body>
        <Analytics />
      </Html>
    );
  }
}

export default MyDocument;
