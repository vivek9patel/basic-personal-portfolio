import React from 'react';

export default function MetaTags() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/meta/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/meta/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/meta/favicon-16x16.png"
      />
      <link rel="manifest" href="/meta/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/meta/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#162447" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}
