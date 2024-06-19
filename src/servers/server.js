// src\servers\server.js
import dgram from "node:dgram"

// Create a new socket
const server = dgram.createSocket({
  type: "udp4",
  recvBufferSize: 65535,
  reuseAddr: true,
})

// Binding to port 14043
server.bind({
  // address: "192.168.1.38",
  port: 14053,
})

// Error handling
server.on("error", (err) => {
  console.error(`Socket error:\n${err.stack}`)
  server.close()
})

// Listening for incoming messages
server.on("message", (msg, rinfo) => {
  console.log(
    `START\nserver got: ${msg} from ${rinfo.address}:${rinfo.port}\nSTOP\n`
  )
})

// Log when the socket is bound and ready to receive messages
server.on("listening", () => {
  const address = server.address()
  console.log(
    `Rokoko Studio Live started listening on ${address.address}:${address.port}`
  )
})
