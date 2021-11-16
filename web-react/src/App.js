import React, { useState } from 'react'

import { Switch, Link, Route } from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'

import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
} from '@material-ui/icons'

import useStyles from './AppStyle'
import clsx from 'clsx'

import Dashboard from './components/Dashboard'
import UserList from './components/UserList'
import Search from './components/Search'
import Profile from './components/Profile'
import Copyright from './components/Copyright'
import { LoginButton, LogoutButton } from './components/Login'

export default function App() {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <p>Loading</p>
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <img
            className={classes.appBarImage}
            src="img/grandstack.png"
            alt="GRANDstack logo"
          />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Welcome To GRANDstack App
          </Typography>
          {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" className={classes.navLink}>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          <Link to="/search" className={classes.navLink}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {isAuthenticated && <Profile />}
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/businesses" component={UserList} />
            <Route exact path="/search" component={Search} />
          </Switch>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}
