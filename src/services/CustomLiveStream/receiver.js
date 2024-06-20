// src\servers\server.js
import dgram from "node:dgram"
// import LiveData from "./LiveData"

// Create a new socket
const server = dgram.createSocket({
  type: "udp4",
  recvBufferSize: 81920,
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
    `Rokoko Studio Live started listening on ${address.address}:${address.port}`
  )
})

// Listening for incoming messages
server.on("message", (msg, rinfo) => {
  console.log(
    `START\nserver got: ${msg} from ${rinfo.address}:${rinfo.port}\nSTOP\n`
  )
  // const msgJSON = JSON.parse(msg)
  // const sceneJSON = msgJSON.scene
  // console.log(
  //   `msg is ${msgJSON.version}\n` +
  //     `fps is ${msgJSON.fps}\n` +
  //     `timestamp is ${sceneJSON.timestamp}\n` +
  //     `actor is ${JSON.stringify(sceneJSON.actors)}\n` +
  //     `props are ${sceneJSON.props}\n` +
  //     `characters are ${sceneJSON.characters}\n` +
  //     `info are ${rinfo.address}:${rinfo.port}\n`
  // )
})

// Error handling
server.on("error", (err) => {
  console.error(`Socket error:\n${err.stack}`)
  server.close()
})
