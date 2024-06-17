// src/services/infoService.js
import axios from "axios";

export const infoRequest = async (config) => {
  try {
    const { ip_address, port, api_key } = config;

    console.log(`http://${ip_address}:${port}/v1/${api_key}/info`);
    const response = await axios.get(
      `http://${ip_address}:${port}/v1/${api_key}/info`,
      {
        // devices_info: Set to true if you want information about live input devices in the scene
        devices_info: true,
        // clips_info: Set to true if you want information about the recorded clips in the scene
        clips_info: true,
      },
    );
    console.log(`response: ${response}`);
    return response.data;
  } catch (error) {
    console.error("Error making API request", error);
    throw error;
  }
};
