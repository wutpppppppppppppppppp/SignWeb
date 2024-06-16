// src/services/playbackService.js
import axios from 'axios'

// Define the playback change flags as constants
const CommandAPIPlaybackChange = {
  Unknown: 0,
  IsPlaying: 1,
  CurrentTime: 2,
  GoToFirstFrame: 4,
  GoToLastFrame: 8,
  PlaybackSpeed: 16,
}

export const changePlaybackState = async (config) => {
  try {
    const { ip_address, port, api_key } = config

    console.log(`http://${ip_address}:${port}/v2/${api_key}/playback`)

    const response = await axios.post(`http://${ip_address}:${port}/v2/${api_key}/playback`, {
      is_playing: true, // playback play/pause state (only if corresponding flag is applied)
      current_time: 0.0, // playback time in seconds (only if corresponding flag is applied)
      playback_speed: 1.0,
      change_flag: CommandAPIPlaybackChange.IsPlaying, // set flag to take control over the play/pause state
    })

    console.log(`response: ${response}`)

    return response.data
  } catch (error) {
    console.error('Error making API request', error)
    throw error
  }
}
