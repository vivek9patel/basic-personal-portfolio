import Document, { Html, Head, Main, NextScript } from 'next/document';
import MetaTags from '../components/meta/MetaTags';

class MyDocument extends Document {
  render() {
    return (
      <Html className='dark'>
        <Head >
          <MetaTags />
        </Head>
        <body className='bg-white dark:bg-black transition-colors duration-500'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument