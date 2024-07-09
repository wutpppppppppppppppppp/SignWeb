import RokokoCommand from "../models/rokokoCommandModel";
import fetch from "node-fetch";

export const saveRokokoCommand = async (req, reply) => {
  const { commandType, ipAddress, port, apiKey } = req.body;

  const command = new RokokoCommand({
    commandType,
    ipAddress,
    port,
    apiKey,
  });

  try {
    await command.save();
    reply.send(command);
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Error saving Rokoko command: " + error.message });
  }
};

export const getRokokoCommands = async (req, reply) => {
  try {
    const commands = await RokokoCommand.find().sort({ timestamp: -1 });
    reply.send(commands);
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Error retrieving Rokoko commands: " + error.message });
  }
};

export const calibrate = async (req, reply) => {
  try {
    const { ipAddress, port, apiKey } = req.body;

    const url = `http://${ipAddress}:${port}/v1/${apiKey}/calibrate`;
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        use_custom_pose: true,
        pose: "tpose",
      }),
    });

    const responseData = await response.json();
    console.log(`response: ${JSON.stringify(responseData)}`);

    reply.send(responseData);
  } catch (error) {
    console.error("Error making API request", error);
    reply
      .status(500)
      .send({ error: "Error making API request: " + error.message });
  }
};

export const startRecording = async (req, reply) => {
  try {
    const { ipAddress, port, apiKey } = req.body;

    const url = `http://${ipAddress}:${port}/v2/${apiKey}/recording/start`;
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
    });

    const responseData = await response.json();
    console.log(`response: ${JSON.stringify(responseData)}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    reply.send(responseData);
  } catch (error) {
    console.error("Error making API request", error);
    reply
      .status(500)
      .send({ error: "Error making API request: " + error.message });
  }
};

export const stopRecording = async (req, reply) => {
  try {
    const { ipAddress, port, apiKey } = req.body;

    const url = `http://${ipAddress}:${port}/v1/${apiKey}/recording/stop`;
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
    });

    const responseData = await response.json();
    console.log(`response: ${JSON.stringify(responseData)}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    reply.send(responseData);
  } catch (error) {
    console.error("Error making API request", error);
    reply
      .status(500)
      .send({ error: "Error making API request: " + error.message });
  }
};
