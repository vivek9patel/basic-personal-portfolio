import Document, { Html, Head, Main, NextScript } from 'next/document';
import MetaTags from '../components/meta/MetaTags';

class MyDocument extends Document {
  render() {
    return (
      <Html className='dark'>
        <Head >
          <MetaTags />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"></link>
        </Head>
        <body className='bg-white dark:bg-black transition-colors duration-300'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument