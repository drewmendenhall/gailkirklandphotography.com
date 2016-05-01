import React from 'react'

import Helmet from 'react-helmet'


// TODO: use object rest to spread all props
// export default ({picture, ...props}) => (
export default ({id, picture}) => {
  id = id || `picture-${picture.id}`

  return (
    <picture id={id}>
      <Helmet
        style={[{cssText: picture.srcSet.map((src, index) => (`${index > 0 ? `
          @media
            (min-width: ${src.width}px) and
            (min-height: ${src.height}px)
          {
        ` : ''}
            #${id} {
              background-image: url(${encodeURI(src.url)});
            }
          ${index > 0 ? '}' : ''}
        `)).join('') + `
          @media
            (min-width: ${picture.minWidth}px) and
            (min-height: ${picture.minHeight}px)
          {
            #${id} {
              background-image: url(${encodeURI(picture.url)});
              background-size: auto;
            }
          }
        `}]}
      />
      {picture.srcSet.slice(1).reverse().map((src) => (
        <source
          key={src.url}
          media={`(min-width: ${src.width}px) and (min-height: ${src.height}px)`}
          srcSet={encodeURI(src.url)}
        />
      ))}
      <source srcSet={encodeURI(picture.srcSet[0].url)} />
      <img src={picture.url} />
    </picture>
  )
}
