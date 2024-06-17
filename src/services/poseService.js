// src/services/poseService.js
import axios from "axios";

export const pose = async (config) => {
  try {
    const { ip_address, port, api_key } = config;

    console.log(`http://${ip_address}:${port}/v1/${api_key}/pose`);

    const response = await axios.get(
      `http://${ip_address}:${port}/v1/${api_key}/pose`,
      {
        name: "",
        mode: "definition",
        space: "local",
      },
    );
    console.log(`response: ${response}`);

    return response.data;
  } catch (error) {
    console.error("Error making API request", error);
    throw error;
  }
};
