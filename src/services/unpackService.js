// src/services/unpackService.js
const fs = require('fs');

const WriteUnpackedToFile = (data, packet_counter) => {
  const scene_info = data.scene;
  const assets = ['actors', ...scene_info.actors.map(actor => actor.name), 'characters', ...scene_info.characters.map(character => character.name)];
  const actors = scene_info.actors;
  
  if (actors.length > 0) {
    const hipPosition = actors[0].body.hip.position;
    const { x, y, z } = hipPosition;
  }

  fs.writeFileSync(`frame_${packet_counter}.csv`, assets.join(','), 'utf8');
};

const Unpack = (data, saveToFile = false, packet_counter) => {
  const info = JSON.parse(data);
  if (saveToFile) WriteUnpackedToFile(info, packet_counter);
};

module.exports = {
  Unpack,
  WriteUnpackedToFile,
};
