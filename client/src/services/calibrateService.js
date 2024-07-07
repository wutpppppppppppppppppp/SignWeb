// src/services/startRecordServiceReplacment.js
export const calibrate = async (config) => {
  try {
    const {
      ip_address,
      port,
      api_key,
      // CLIP_NAME,
      // TIME_CODE,
      // FRAME_RATE,
      // BACK_TO_LIVE,
    } = config

    const url = `http://${ip_address}:${port}/v1/${api_key}/calibrate`
    console.log(url)

    const response = await fetch(url, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({
        use_custom_pose: true,
        pose: "tpose",
        //   filename: CLIP_NAME,
        //   time: TIME_CODE,
        //   frame_rate: FRAME_RATE,
        //   back_to_live: BACK_TO_LIVE,
      }),
    })

    const responseData = await response.json();
    console.log(`response: ${JSON.stringify(responseData)}`);

    return responseData;
  } catch (error) {
    console.error("Error making API request", error);
    throw error;
  }
};