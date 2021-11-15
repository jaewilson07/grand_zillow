'use strict'

export const getBoundingBox = (centerPoint, distance = 1000) => {
  // helper functions (degrees<?>radians)
  const degToRad = (num) => {
    return num * (Math.PI / 180)
  }
  const radToDeg = (num) => {
    return (180 * num) / Math.PI
  }
  // coordinate limits
  const MIN_LAT = degToRad(-90)
  const MAX_LAT = degToRad(90)
  const MIN_LON = degToRad(-180)
  const MAX_LON = degToRad(180)

  // Earth's radius (km)
  const R = 6378.1

  // angular distance in radians on a great circle
  const radDist = distance / 1000 / R
  // center point coordinates (deg)
  const degLat = centerPoint[0]
  const degLon = centerPoint[1]

  // center point coordinates (rad)
  const radLat = degToRad(degLat)
  const radLon = degToRad(degLon)

  // minimum and maximum latitudes for given distance
  let minLat = radLat - radDist
  let maxLat = radLat + radDist

  // minimum and maximum longitudes for given distance
  let minLon = void 0
  let maxLon = void 0

  // define deltaLon to help determine min and max longitudes
  const deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat))

  if (minLat > MIN_LAT && maxLat < MAX_LAT) {
    minLon = radLon - deltaLon
    maxLon = radLon + deltaLon
    if (minLon < MIN_LON) {
      minLon = minLon + 2 * Math.PI
    }
    if (maxLon > MAX_LON) {
      maxLon = maxLon - 2 * Math.PI
    }
  }
  // a pole is within the given distance
  else {
    minLat = Math.max(minLat, MIN_LAT)
    maxLat = Math.min(maxLat, MAX_LAT)
    minLon = MIN_LON
    maxLon = MAX_LON
  }

  return {
    minLat: radToDeg(minLat),
    minLon: radToDeg(minLon),
    maxLat: radToDeg(maxLat),
    maxLon: radToDeg(maxLon),
  }
}
