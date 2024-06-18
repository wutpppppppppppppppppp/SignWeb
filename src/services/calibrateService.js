// src/services/calibrateService.js
import axios from "axios"

export const calibrate = async (config) => {
  try {
    const { ip_address, port, api_key, SMARTSUIT_NAME } = config

    console.log(`http://${ip_address}:${port}/v1/${api_key}/calibrate`)

    const response = await axios.post(
      `http://${ip_address}:${port}/v1/${api_key}/calibrate`,
      {
        device_id: SMARTSUIT_NAME,
        countdown_delay: 30,
        skip_suit: true,
        skip_gloves: true,
        use_custom_pose: false,
        pose: "straight-arms-down",
      }
    )

    console.log(`response: ${response}`)

    return response.data
  } catch (error) {
    console.error("Error making API request", error)
    throw error
  }
}
