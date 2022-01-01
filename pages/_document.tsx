import Document, { Html, Head, Main, NextScript } from 'next/document';
import Meta from '../components/meta/Meta';

class MyDocument extends Document {
  render() {
    return (
      <Html className='dark'>
        <Head >
          <Meta />
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