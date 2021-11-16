import React, { useState, useCallback, useEffect } from 'react'

import { useAuth0 } from '@auth0/auth0-react'

import {
  createHttpLink,
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
})

export default function ApolloClientWrapper({ children }) {
  const [accessToken, setAccessToken] = useState()

  const { getAccessTokenSilently, loginWithRedirect } = useAuth0()

  const getAccessToken = useCallback(async () => {
    try {
      const newToken = await getAccessTokenSilently()
      console.log(newToken)
      setAccessToken(newToken)
    } catch (err) {
      console.log(err)
      // loginWithRedirect()
    }
  }, [getAccessTokenSilently, loginWithRedirect])

  useEffect(() => {
    getAccessToken()
  }, [getAccessToken])

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
