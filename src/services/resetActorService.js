// src/services/resetActorService.js
import axios from "axios";

export const resetActor = async (config) => {
  try {
    const { ip_address, port, api_key } = config;

    console.log(`http://${ip_address}:${port}/v1/${api_key}/livestream`);

    const response = await axios.post(
      `http://${ip_address}:${port}/v1/${api_key}/resetactor`,
      {
        deviceId: "",
      },
    );
    console.log(`response: ${response}`);

    return response.data;
  } catch (error) {
    console.error("Error making API request", error);
    throw error;
  }
};
