import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import ApolloClientWrapper from './context/ApolloClientWrapper'
import Auth0Wrapper from './context/Auth0Wrapper'

const Main = () => {
  return (
    <Router>
      <Auth0Wrapper>
        <ApolloClientWrapper>
          <App />
        </ApolloClientWrapper>
      </Auth0Wrapper>
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()
