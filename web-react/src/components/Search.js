import React from 'react'
import MapResults from './MapResults'

import { gql, useQuery } from '@apollo/client'

const LIMIT = 6
const DISTANCE = 5000

const PROPERTY_SEARCH_QUERY = gql`
  query($LIMIT: Int, $DISTANCE: Float!) {
    properties(
      where: {
        location_LT: {
          point: { latitude: 45.667, longitude: -111.054 }
          distance: $DISTANCE
        }
        address_NOT: null
        full_baths_NOT: null
      }
      options: { sort: [{ TotalValue: DESC }], limit: 100 }
    ) {
      address
      TotalValue
      bedrooms
      full_baths
      half_baths
      id
      sqft
      photos(limit: $LIMIT) {
        url
      }
      in_subdivision {
        name
      }
      location {
        latitude
        longitude
      }
    }
  }
`

export default function Search() {
  const { loading, error, data } = useQuery(PROPERTY_SEARCH_QUERY, {
    variables: { LIMIT, DISTANCE },
  })

  if (error) {
    console.log(error)
    return <p>Error</p>
  }
  if (loading) return <p>Loading</p>

  return <MapResults properties={data.properties} />
}
