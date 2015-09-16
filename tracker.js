import url from 'url'

export function page(analytics, req, userIdSegment) {
  var {body, headers} = req
  var parsed = url.parse(req.url, true)
  var path = (parsed.path ? (parsed.path !== '/' ? parsed.path : '') : '')
  // TODO: better https detection
  var protocol = `http${req.socket.remotePort === 443 ? 's' : ''}:`
  var {referer} = headers

  analytics.page({
    userId: `anonymous${userIdSegment || ''}`,
		name: req.url,
    properties: Object.assign({
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

export function eventMiddleware(analytics, userIdSegment) {
  return (req, res, next) => {
    var {body, headers} = req
    var parsed = url.parse(req.url, true)
    var {query} = parsed

    analytics.track({
      event: parsed.pathname,
      properties: {body, headers, query},
      userId: `anonymous${userIdSegment || ''}`,
    })

    next()
  }
}

function compact(obj) {
	var result = {}

	Object.keys(obj).filter(function(key) {return obj[key]}).forEach(function(key) {
		result[key] = obj[key]
	})

	return result
}
