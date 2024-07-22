// frontend/src/services/CustomLiveStream/receiver.js
import dgram from "node:dgram"
import { WebSocketServer } from "ws"

// Create a new socket
const server = dgram.createSocket({
  //for listen on internet
  type: "udp4", //use ip d4
  recvBufferSize: 81920, // 800kb
  reuseAddr: true,
})

// Binding to port 14053
server.bind({
  port: 14053,
})

server.on("listening", () => {
  const address = server.address()
  console.log(
    `Rokoko Studio Live started listening on ${address.address}:${address.port}` //
  )
})

const wss = new WebSocketServer({ port: 8080 })
wss.on("connection", (ws) => {
  console.log("WebSocket client connected")
})

// Listening for incoming messages
server.on("message", (msg, rinfo) => {
  // Broadcast message to all WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(msg)
    }
  })
})

// Error handling
server.on("error", (err) => {
  console.error(`Socket error:\n${err.stack}`)
  server.close()
})
