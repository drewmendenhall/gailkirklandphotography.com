import React from 'react'

import Helmet from 'react-helmet'

const GalleryPicture = (props) => {
  const {picture} = props

  const id = props.id || `picture-${picture.id}`
  const {minHeight, minWidth} = picture

  return (
    <picture id={id}>
      <Helmet
        style={[
          {
            cssText:
              picture.srcSet
                .map(
                  (src, index) => `${
                    index > 0
                      ? `@media (min-width: ${src.width}px) and (min-height: ${src.height}px) {`
                      : ''
                  }
                    #${id} {
                      background-image: url(${encodeURI(src.url)});
                    }
                    ${index > 0 ? '}' : ''}
                  `,
                )
                .join('')
                .replace(/\n\s*/g, '') +
              `@media (min-width: ${minWidth}px) and (min-height: ${minHeight}px) {
                #${id} {
                  background-image: url(${encodeURI(picture.url)});
                  background-size: auto;
                }
              }
              `.replace(/\n\s*/g, ''),
          },
        ]}
      />
      {picture.srcSet
        .slice(1)
        .reverse()
        .map((src) => (
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

export default GalleryPicture
