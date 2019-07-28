import React from 'react'

import Helmet from 'react-helmet'

import CommonSessionInfo from './CommonSessionInfo'

const PetSessionsInfo = ({type = 'pet'}) => {
  const capitalizedType = type[0].toUpperCase() + type.slice(1)

  return (
    <div className="container">
      <Helmet title={`${capitalizedType} Sessions`} />
      <h1>{capitalizedType} Sessions</h1>
      <p>Session fee: $200</p>
      <CommonSessionInfo
        includes={[
          'Photography of up to two animals from the same household at a location of your choice',
        ]}
      />
    </div>
  )
}

export default PetSessionsInfo
