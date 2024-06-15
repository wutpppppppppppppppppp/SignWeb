// src/calibrateService.js
import axios from 'axios'

const fetchCalibrateData = async () => {
  try {
    const response = await axios.get('/calibrateData.json')
    return response.data
  } catch (error) {
    console.error('Error fetching calibrate data', error)
    throw error
  }
}

export const calibrate = async () => {
  try {
    const data = {
      ip_address: '172.20.10.3',
      port: '14053',
      api_key: '1234',
      frame_rate: '60',
      back_to_live: false,
    }
    const { ip_address, port, api_key, frame_rate, back_to_live } = data
    console.log(`http://${ip_address}:${port}/v1/${api_key}/calibrate`)

    json = {
    'device_id': SMARTSUIT_NAME,
    'countdown_delay': 30,
    'skip_suit' : True,
    'skip_gloves' : True,
    'use_custom_pose' : False,
    'pose' : 'straight-arms-down'
    } 

    const response = await axios.post(`http://${ip_address}:${port}/v1/${api_key}/calibrate`, {
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
