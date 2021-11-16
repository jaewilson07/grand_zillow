import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { Avatar, Paper, Typography } from '@material-ui/core'
import { Loading } from './Loading'

const Profile = () => {
  const { user } = useAuth0()

  return (
    <Paper style={{ padding: '20px' }}>
      <Avatar src={user.picture} alt={user.name} />
      <Typography>{user.name}</Typography>
      <Typography> {user.email}</Typography>
    </Paper>
  )
}

export default withAuthenticationRequired(Profile, {
  onRedirecting: function onRedirectingComponent() {
    return <Loading />
  },
})
