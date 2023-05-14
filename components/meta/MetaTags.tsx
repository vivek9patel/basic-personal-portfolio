import React from 'react'

export default function MetaTags() {
    return (
        <>
            <link rel="apple-touch-icon" sizes="180x180" href="/meta/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png" />
            <link rel="manifest" href="/meta/site.webmanifest" />
            <link rel="mask-icon" href="/meta/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#2b5797" />
            <meta name="theme-color" content="#162447" />

            <title>About Vivek</title>
            <meta name="title" content="Vivek Patel's Personal Website | Blogs " />
            <meta name="description" content="vivek9patel's personal website with blogs on the topics of  React.js, CSS, website designing & making." />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://vivek9patel.dev/" />
            <meta property="og:title" content="Vivek Patel's Personal Website | Blogs " />
            <meta property="og:description" content="vivek9patel's personal website with blogs on the topics of  React.js, CSS, website designing & making." />
            <meta property="og:image" content="/meta/meta-social-image.png" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://vivek9patel.dev/" />
            <meta property="twitter:title" content="Vivek Patel's Personal Website | Blogs " />
            <meta property="twitter:description" content="vivek9patel's personal website with blogs on the topics of  React.js, CSS, website designing & making." />
            <meta property="twitter:image" content="/meta/meta-social-image.png" />
        </>
    )
}
