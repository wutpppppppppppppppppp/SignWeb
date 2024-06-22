import fetch from 'node-fetch';

export const calibrate = async (config) => {
  try {
    const { ip_address, port, api_key, SMARTSUIT_NAME } = config;

    const url = `http://${ip_address}:${port}/v1/${api_key}/calibrate`;
    console.log(url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        device_id: SMARTSUIT_NAME,
        countdown_delay: 30,
        skip_suit: true,
        skip_gloves: true,
        use_custom_pose: false,
        pose: "straight-arms-down",
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