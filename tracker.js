import url from 'url'

export function page(analytics, req, userIdSegment) {
  const {body, headers} = req
  const parsed = url.parse(req.url, true)

  const address = headers['x-forwarded-for'] || req.connection.remoteAddress
  const path = (parsed.path ? (parsed.path !== '/' ? parsed.path : '') : '')
  // TODO: better https detection
  const protocol = `http${req.socket.remotePort === 443 ? 's' : ''}:`
  const {referer} = headers

  analytics.page({
    userId: `anonymous${userIdSegment || ''}`,
		name: req.url,
    properties: Object.assign({
      address,
      body,
      headers,
      referer,
      // TODO: get title from generated markup, or url map for performance
      title: 'Gail Kirkland Photography',
      // TODO: get protocol and hostname from currently running server
      url: `${protocol}//${headers.host}${path}`,
		}, compact(parsed)),
  })
}

function compact(obj) {
	const result = {}

	Object.keys(obj).filter(function(key) {return obj[key]}).forEach(function(key) {
		result[key] = obj[key]
	})

	return result
}

export default function eventMiddleware(analytics, userIdSegment) {
  return (req, res, next) => {
    const {body, headers} = req
    const parsed = url.parse(req.url, true)

    const address = headers['x-forwarded-for'] || req.connection.remoteAddress
    const {pathname, query} = parsed

    analytics.track({
      event: pathname,
      properties: {address, body, headers, query},
      userId: `anonymous${userIdSegment || ''}`,
    })

    next()
  }
}
