// src/services/startRecordService.js
import axios from "axios"

export const startRecording = async (config) => {
  try {
    const {
      ip_address,
      port,
      api_key,
      // CLIP_NAME, TIME_CODE, FRAME_RATE,
    } = config

    console.log(`http://${ip_address}:${port}/v2/${api_key}/recording/start`)

    const response = await axios.post(
      `http://${ip_address}:${port}/v1/${api_key}/recording/start`,
      {
        // filename: CLIP_NAME,
        // time: TIME_CODE,
        // frame_rate: FRAME_RATE
      }
    )

    console.log(`response: ${response}`)

    return response.data
  } catch (error) {
    console.error("Error making API request", error)
    throw error
  }
}
