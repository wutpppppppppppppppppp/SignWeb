// src/startRecordService.js
import axios from 'axios'

const fetchRecordingData = async () => {
  try {
    const response = await axios.get('/recordingData.json')
    return response.data
  } catch (error) {
    console.error('Error fetching recording data', error)
    throw error
  }
}

export const startRecording = async () => {
  try {
    // const data = await fetchRecordingData()
    const data = {
      ip_address: '192.168.1.18',
      port: '14053',
      api_key: '1234',
      frame_rate: '30',
      back_to_live: false,
    }
    const { ip_address, port, api_key, frame_rate, back_to_live } = data
    console.log(`http://${ip_address}:${port}/v2/${api_key}/recording/start`)
    const response = await axios.post(`http://${ip_address}:${port}/v2/${api_key}/recording/start`, {
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
