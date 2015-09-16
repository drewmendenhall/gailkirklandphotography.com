import React from 'react'

export default class Html extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1" />
          <title>Gail Kirkland Photography</title>
          <link rel="stylesheet" href="/styles/app.css" />
        </head>
        <body>
          <main dangerouslySetInnerHTML={{__html: this.props.markup}}>
          </main>
          <script src="/bundle.js"></script>
        </body>
      </html>
    )
  }
}
