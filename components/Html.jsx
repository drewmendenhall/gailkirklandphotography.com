import React from 'react'

export default ({
  includeTracking,
  link,
  location,
  markup,
  meta,
  microsoftTags,
  openGraphTags,
  title,
}) => {
  const titleSegments = (openGraphTags &&
    title[0].props.children.split(' | ')
  )

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {title && title.toComponent()}
        {meta && meta.toComponent()}
        {microsoftTags &&
          <meta name="msapplication-TileColor" content="#414141" />
        }
        {microsoftTags &&
          <meta name="msapplication-TileImage" content="/touch-icon-144x144.png" />
        }
        {openGraphTags &&
          <meta property="og:description" content="A picture says more than a thousand words..." />
        }
        {openGraphTags &&
          <meta
            property="og:site_name"
            content={titleSegments[titleSegments.length - 1]}
          />
        }
        {openGraphTags &&
          <meta property="og:title" content={titleSegments[0]} />
        }
        {openGraphTags &&
          <meta property="og:url" content={location.href} />
        }
        {link && link.toComponent()}
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body>
        <main dangerouslySetInnerHTML={{__html: markup}}></main>
        <script src="/app.js"></script>
        {includeTracking &&
          <script
            dangerouslySetInnerHTML={{__html: `
              !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
                analytics.load("qGaWfqjkLsD3LXoTjtXuGqbBQrfAqVhg");
                analytics.page()
              }}();
          `}}
          ></script>
        }
      </body>
    </html>
  )
}
