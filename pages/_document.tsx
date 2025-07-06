import Document, { Html, Head, Main, NextScript } from 'next/document';
import MetaTags from '../components/meta/MetaTags';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

class MyDocument extends Document {
  render() {
    return (
      <Html suppressHydrationWarning lang="en">
        <Head>
          <MetaTags />

          {/* DNS prefetch for external resources */}
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
          <link rel="dns-prefetch" href="//api.github.com" />

          {/* Preconnect to important third-party domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          {/* Critical CSS - inline small CSS if needed */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
              /* Critical CSS for loading states */
              .loading-spinner {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 3px solid rgba(255,255,255,.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s ease-in-out infinite;
              }
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
              /* Prevent layout shift */
              .hero-section {
                min-height: 60vh;
              }
            `,
            }}
          />

          {/* Performance optimizations */}
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" content="#000000" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />

          {/* Resource hints for better performance */}
          <link rel="prefetch" href="/resume" />
          <link rel="prefetch" href="/projects" />
        </Head>
        <body className="transition-colors duration-300 custom-scroll-bar-x">
          <Main />
          <NextScript />
          <Analytics />
          <SpeedInsights />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
