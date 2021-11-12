import React from 'react'
import MapResults from './MapResults'

import { gql, useQuery } from '@apollo/client'

const PROPERTY_SEARCH_QUERY = gql`
  {
    properties(
      where: {
        location_LT: {
          point: { latitude: 45.667, longitude: -111.054 }
          distance: 4000
        }
        address_NOT: null
        full_baths_NOT: null
      }
      options: { sort: [{ TotalValue: DESC }], limit: 10 }
    ) {
      address
      TotalValue
      bedrooms
      full_baths
      half_baths
      id
      sqft
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
  const { loading, error, data } = useQuery(PROPERTY_SEARCH_QUERY)

  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return <MapResults properties={data.properties} />
}
