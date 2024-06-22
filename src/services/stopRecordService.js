// src/services/stopRecordService.js
import axios from "axios"

export const stopRecording = async (config) => {
  try {
    const {
      ip_address,
      port,
      api_key,
      // CLIP_NAME,TIME_CODE,FRAME_RATE,BACK_TO_LIVE
    } = config

    console.log(`http://${ip_address}:${port}/v2/${api_key}/recording/stop`)
    const response = await axios.post(
      `http://${ip_address}:${port}/v2/${api_key}/recording/stop`,
      {
        // filename: CLIP_NAME,
        // time: TIME_CODE,
        // frame_rate: FRAME_RATE,
        // back_to_live: BACK_TO_LIVE
      }
    )

    console.log(`response: ${response}`)
    return response.data
  } catch (error) {
    console.error("Error making API request", error)
    throw error
  }
}
