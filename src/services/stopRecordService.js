// src/services/stopRecordService.js
import axios from "axios"

export const stopRecording = async (config) => {
  try {
    const { ip_address, port, api_key, CLIP_NAME, TIME_CODE, FRAME_RATE, BACK_TO_LIVE } = config;

    const url = `http://${ip_address}:${port}/v2/${api_key}/recording/stop`;
    console.log(url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: CLIP_NAME,
        time: TIME_CODE,
        frame_rate: FRAME_RATE,
        back_to_live: BACK_TO_LIVE
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(`response: ${JSON.stringify(responseData)}`);

    return responseData;
  } catch (error) {
    console.error("Error making API request", error);
    throw error;
  }
};
