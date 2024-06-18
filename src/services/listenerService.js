// src/services/trackerService.js
import axios from "axios";
const dgram = require('dgram');
const fs = require('fs');
const { Unpack } = require('./unpackService');

// configuration
const HOST = '';
const PORT = 14043;
const UNPACK_PACKET = false;
const SAVE_TO_FILE = false;

let packet_counter = 0;

const WriteUnpackedToFile = (data) => {
  if (SAVE_TO_FILE) {
    const scene_info = data.scene;
    const assets = ['actors', ...scene_info.actors.map(actor => actor.name), 'characters', ...scene_info.characters.map(character => character.name)];
    const actors = scene_info.actors;
    
    if (actors.length > 0) {
      const hipPosition = actors[0].body.hip.position;
      const { x, y, z } = hipPosition;
    }

    fs.writeFileSync(`frame_${packet_counter}.csv`, assets.join(','), 'utf8');
  }
};

const Unpack = (data) => {
  const info = JSON.parse(data);
  if (SAVE_TO_FILE) WriteUnpackedToFile(info);
};

// Main loop
const start_time = Date.now();
let fps_counter = 0;

console.log(`Start listener at port ${PORT}`);
const server = dgram.createSocket('udp4');
server.bind(PORT, HOST);

server.on('message', (data, rinfo) => {
  if (UNPACK_PACKET) {
    Unpack(data);
  }

  const packet_time = Date.now();
  fps_counter++;
  packet_counter++;

  if ((packet_time - start_time) > 1000) {
    console.log(`received ${fps_counter} packets in a second`);
    fps_counter = 0;
    start_time += 1000;
  }
});

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

