// frontend/src/services/startRecordService.js
export const startRecording = async (config) => {
  try {
    const { ip_address, port, api_key } = config

    const url = `http://${ip_address}:${port}/v2/${api_key}/recording/start`
    console.log(url)
    console.log(config)
    const response = await fetch(url, {
      method: "POST",
    })

    console.log(`response: ${response}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw {
        message: `Error: ${response.statusText}`,
        response: {
          status: response.status,
          data: errorData,
        },
      }
    }

    return await response.json()
  } catch (error) {
    console.error("Error making API request", error)
    throw error
  }
}
