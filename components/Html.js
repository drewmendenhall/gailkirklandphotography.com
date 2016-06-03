import React from 'react'

import analyticsSnippet from 'segmentio-snippet'

export default ({
  href,
  includeMicrosoftTags,
  includeOpenGraphTags,
  includeTracking,
  link,
  markup,
  meta,
  segmentWriteKey,
  style,
  title,
}) => {
  const titleSegments = (includeOpenGraphTags &&
    title.toComponent()[0].props.children.split(' | ')
  )

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {title && title.toComponent()}
        {meta && meta.toComponent()}
        {includeMicrosoftTags && [
          <meta name="msapplication-TileColor" content="#414141" />,
          <meta
            name="msapplication-TileImage"
            content="/touch-icon-144x144.png"
          />,
        ]}
        {includeOpenGraphTags && [
          <meta
            property="og:description"
            content="A picture says more than a thousand words..."
          />,
          <meta
            property="og:site_name"
            content={titleSegments[titleSegments.length - 1]}
          />,
          <meta property="og:title" content={titleSegments[0]} />,
          <meta property="og:url" content={href} />,
        ]}
        {link && link.toComponent()}
        <link rel="stylesheet" href="/app.css" />
        {style && style.toComponent()}
      </head>
      <body>
        <main dangerouslySetInnerHTML={{__html: markup}}></main>
        <script src="/vendor.js"></script>
        <script src="/app.js"></script>
        {includeTracking &&
          <script
            dangerouslySetInnerHTML={{
              __html: analyticsSnippet.min({apiKey: segmentWriteKey}),
            }}
          ></script>
        }
      </body>
    </html>
  )
}
