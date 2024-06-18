// src/services/trackerService.js
import axios from "axios"

export const tracker = async (config) => {
  try {
    const { ip_address, port, api_key } = config

    console.log(`http://${ip_address}:${port}/v2/${api_key}/tracker`)
    const response = await axios.get(
      `http://${ip_address}:${port}/v2/${api_key}/tracker`,
      {
        device_id: "",
        bone_attached: "", // hips
        position: { X: 1.0, Y: 1.0, Z: 1.0 },
        rotation: { X: 1.0, Y: 1.0, Z: 1.0 },
        timeout: 2.0,
        is_query_only: true,
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}
