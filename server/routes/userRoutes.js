import {
  saveRokokoCommand,
  getRokokoCommands,
  calibrate,
  startRecording,
  stopRecording,
} from "../controllers/rokokoController";

const routes = [
  {
    method: "POST",
    url: "/api/rokoko/command",
    handler: saveRokokoCommand,
  },
  {
    method: "GET",
    url: "/api/rokoko/commands",
    handler: getRokokoCommands,
  },
  {
    method: "POST",
    url: "/api/rokoko/calibrate",
    handler: calibrate,
  },
  {
    method: "POST",
    url: "/api/rokoko/recording/start",
    handler: startRecording,
  },
  {
    method: "POST",
    url: "/api/rokoko/recording/stop",
    handler: stopRecording,
  },
];

export default routes;
