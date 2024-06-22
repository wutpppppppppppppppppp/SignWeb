export const startRecording = async (config) => {
  try {
    const { ip_address, port, api_key } = config;

    const url = `http://${ip_address}:${port}/v1/${api_key}/recording/start`;
    console.log(url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: CLIP_NAME,
        time: TIME_CODE,
        frame_rate: FRAME_RATE
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
}
