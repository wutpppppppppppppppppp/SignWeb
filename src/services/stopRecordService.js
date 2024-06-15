// src/services/stopRecordService.js
import axios from 'axios'

export const stopRecording = async (config) => {
  try {
    const { ip_address, port, api_key, frame_rate, back_to_live } = config

    console.log(`http://${ip_address}:${port}/v2/${api_key}/recording/stop`)
    const response = await axios.post(`http://${ip_address}:${port}/v2/${api_key}/recording/stop`, {
      frame_rate: frame_rate,
      back_to_live: back_to_live,
    })

    console.log(`response: ${response}`)
    return response.data
  } catch (error) {
    console.error('Error making API request', error)
    throw error
  }
}
