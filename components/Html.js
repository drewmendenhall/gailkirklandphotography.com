import React from 'react'

export default ({
  includeMicrosoftTags,
  includeOpenGraphTags,
  link,
  markup,
  meta,
  style,
  title,
  url,
}) => {
  const titleSegments =
    includeOpenGraphTags && title.toComponent()[0].props.children.split(' | ')

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
          <meta property="og:url" content={url} />,
        ]}
        {link && link.toComponent()}
        <link rel="stylesheet" href="/app.css" />
        {style && style.toComponent()}
      </head>
      <body>
        <main dangerouslySetInnerHTML={{__html: markup}}></main>
        <script src="/vendors~app.js"></script>
        <script src="/app.js"></script>
      </body>
    </html>
  )
}
