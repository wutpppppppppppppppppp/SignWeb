// utils/webSocketUtil.js
export const setupWebSocket = (url, onMessage) => {
  const ws = new WebSocket(url)
  ws.onmessage = (event) => {
    event.data
      .text()
      .then((text) => {
        try {
          const jsonData = JSON.parse(text)
          onMessage(jsonData)
        } catch (error) {
          console.error("Error parsing JSON from Blob:", error)
        }
      })
      .catch((err) => {
        console.error("Error reading Blob as text:", err)
      })
  }

  return ws
}
