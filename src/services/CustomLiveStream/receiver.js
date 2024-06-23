import dgram from "node:dgram"
import * as fs from "node:fs"
import { WebSocketServer } from "ws"

// Create a new socket
const server = dgram.createSocket({ //for listen on internet
  type: "udp4", //use ip d4
  recvBufferSize: 81920,  // 800kb
  reuseAddr: true,
})

// Binding to port 14053
server.bind({
  port: 14053,
})

// Log when the socket is bound and ready to receive messages
server.on("listening", () => { 
  const address = server.address()
  console.log(
    `Rokoko Studio Live started listening on ${address.address}:${address.port}` //
  )
})

// WebSocket server setup
const wss = new WebSocketServer({ port: 8080 })
wss.on("connection", (ws) => {
  console.log("WebSocket client connected")
})

// Listening for incoming messages
server.on("message", (msg, rinfo) => { 
  console.log(`msg sent`) //if write msg ; json file

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
