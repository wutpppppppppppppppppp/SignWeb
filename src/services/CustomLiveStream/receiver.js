// src\servers\server.js
import dgram from "node:dgram"
import * as fs from "node:fs"

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
  // console.log(`\n${msg}\nfrom ${rinfo.address}:${rinfo.port}\n`)
  fs.writeFile("data_saved.json", msg, function (err) {
    if (err) {
      console.log(`error is ${err}`)
    }
  })
  const data_raw = JSON.parse(msg)
  console.log(
    `msg is ${data_raw.version}\n` +
      `fps is ${data_raw.fps}\n` +
      `timestamp is ${data_raw.scene.timestamp}\n` +
      `actor is ${JSON.stringify(data_raw.scene.actors)}\n` +
      `props are ${data_raw.scene.props}\n` +
      `characters are ${data_raw.scene.characters}\n` +
      `info are ${rinfo.address}:${rinfo.port}\n`
  )
})

// Error handling
server.on("error", (err) => {
  console.error(`Socket error:\n${err.stack}`)
  server.close()
})
