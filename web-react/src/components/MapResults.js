import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core'
import clsx from 'clsx'

import MapGL, { Marker } from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapResults({ properties }) {
  const theme = useTheme()

  const style = {
    padding: '4px',
    color: '#fff',
    cursor: 'pointer',
    background: '#1978c8',
    borderRadius: '50px',
  }

  const useStyles = makeStyles((theme) => ({
    root: { display: 'flex' },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: { height: 540 },
  }))

  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  const [viewport, setViewport] = useState({
    latitude: 45.667,
    longitude: -111.0547,
    zoom: 15,
  })

  const [currentProperty, setCurrentProperty] = useState(properties[0])

  console.log(properties, currentProperty)

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={7}>
          <Paper className={fixedHeightPaper}>
            <MapGL
              style={{ width: '100%', height: '400px' }}
              mapStyle="mapbox://styles/mapbox/light-v9"
              accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              latitude={viewport.latitude}
              longitude={viewport.longitude}
              zoom={viewport.zoom}
              onViewportChange={setViewport}
            >
              {properties.map((prop) => {
                return (
                  <Marker
                    key={prop.id}
                    latitude={prop.location.latitude}
                    longitude={prop.location.longitude}
                  >
                    <div
                      style={style}
                      onClick={() => setCurrentProperty(prop)}
                    ></div>
                  </Marker>
                )
              })}
            </MapGL>
            ;
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={5}>
          <Paper className={fixedHeightPaper}>
            <p>{currentProperty.address}</p>
            <ul>
              <li>Square Feet: {currentProperty.sqft}</li>
              <li>Bedrooms: {currentProperty.bedrooms}</li>
              <li>Full Baths: {currentProperty.full_baths}</li>
              <li>Half Baths: {currentProperty.half_baths}</li>
              <li>Subdivision : {currentProperty.in_subdivision[0].name}</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
