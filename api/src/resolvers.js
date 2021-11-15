import dotenv from 'dotenv'
import axios from 'axios'
import { getBoundingBox } from './convertToRads'

dotenv.config()
const MAPILLARY_TOKEN = process.env.MAPILLARY_ACCESSTOKEN

const resolvers = {
  property: {
    photos: async ({ location: { point } }, { limit, radius }) => {
      const { minLat, minLon, maxLat, maxLon } = getBoundingBox(
        [point.y, point.x],
        radius
      )

      const headers = { Authorization: `OAuth ${MAPILLARY_TOKEN}` }
      const mapillary_axios = axios.create({ headers })

      //www.mapillary.com/developer/api-documentation/#image (see "Image search")
      const MAPILLARY_URL = 'https://graph.mapillary.com'

      const MAPILLARY_URL_IMAGESEARCH = `${MAPILLARY_URL}/images?limit=${limit}&fields=id&bbox=${minLon},${minLat},${maxLon},${maxLat}`

      const response_imagesearch = await mapillary_axios({
        url: MAPILLARY_URL_IMAGESEARCH,
        method: 'GET',
      })

      const data_imagesearch = response_imagesearch.data.data

      //https://www.mapillary.com/developer/api-documentation/#image

      const fieldsToRetrieve = [
        'id',
        'thumb_1024_url',
        'captured_at',
        'sequence',
      ]
      const res = await Promise.all(
        data_imagesearch.map(async (image) => {
          const MAPILLARY_URL_IMAGE = `${MAPILLARY_URL}/${
            image.id
          }?fields=${fieldsToRetrieve.join(',')}`

          const response_image = await mapillary_axios({
            url: MAPILLARY_URL_IMAGE,
            method: 'GET',
          })

          const { data } = response_image

          return {
            id: data.id,
            url: data.thumb_1024_url,
            captured_at: data.captured_at,
            sequence: data.sequence,
          }
        })
      )
      return res
    },
  },
}

export default resolvers
