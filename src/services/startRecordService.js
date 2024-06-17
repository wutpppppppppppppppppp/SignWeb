// src/services/startRecordService.js
import axios from "axios";

export const startRecording = async (config) => {
  try {
    const { ip_address, port, api_key } = config;

    console.log(`http://${ip_address}:${port}/v2/${api_key}/recording/start`);

    const response = await axios.post(
      `http://${ip_address}:${port}/v2/${api_key}/recording/start`,
      {
        // frame_rate: frame_rate,
        // back_to_live: back_to_live,
      },
    );

    console.log(`response: ${response}`);

    return response.data;
  } catch (error) {
    console.error("Error making API request", error);
    throw error;
  }
};
