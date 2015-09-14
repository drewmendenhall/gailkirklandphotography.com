import pathToRegExp from 'path-to-regexp'
import url from 'url'

const redirects = {
  '/galleries': '/galleries/dogs',
}
const validSecondSegmentsMap = {
  'galleries': [
    'dogs',
    'horses',
    'people',
    'twilight',
  ],
  'sessions': [
    'cats',
    'dogs',
    'horses',
    'twilight',
  ],
}

export default () => (
  (req, res, next) => {
    var {pathname} = url.parse(req.url)

    var target = redirects[pathname]

    if (target) return redirect(res, target)

    if (redirectIfInvalidSecondSegment(res, pathname, 'galleries')) return
    if (redirectIfInvalidSecondSegment(res, pathname, 'sessions')) return

    next()
  }
)

function getSecondSegment(path, firstSegment) {
  var re = pathToRegExp(`/${firstSegment || '*'}/:segment`)
  var matches = re.exec(path)

  return matches && matches[1]
}
function redirect(response, location = '/', statusCode = 302) {
  response.statusCode = statusCode
  response.setHeader('Location', location)
  response.end()
}
function redirectIfInvalidSecondSegment(response, path, firstSegment) {
  var secondSegment = getSecondSegment(path, firstSegment)
  var validSecondSegments = validSecondSegmentsMap[firstSegment]

  if (secondSegment && !validSecondSegments.includes(secondSegment)) {
    redirect(response, `/${firstSegment}/${validSecondSegments[0]}`)
    return true
  }
}
