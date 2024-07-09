export const calibrate = async (config) => {
  try {
    const { ip_address, port, api_key } = config

    const url = `http://${ip_address}:${port}/v1/${api_key}/calibrate`
    console.log(url)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        use_custom_pose: true,
        pose: "tpose",
      }),
    })

    const responseData = await response.json()
    console.log(`response: ${JSON.stringify(responseData)}`)

    return responseData
  } catch (error) {
    console.error("Error making API request", error)
    throw error
  }
}
