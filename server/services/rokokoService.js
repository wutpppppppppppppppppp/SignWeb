import RokokoCommand from "../models/rokokoCommandModel";

export const saveRokokoCommand = async (
  commandType,
  ipAddress,
  port,
  apiKey
) => {
  const command = new RokokoCommand({
    commandType,
    ipAddress,
    port,
    apiKey,
  });

  try {
    await command.save();
    return command;
  } catch (error) {
    throw new Error("Error saving Rokoko command: " + error.message);
  }
};

export const getRokokoCommands = async () => {
  try {
    const commands = await RokokoCommand.find().sort({ timestamp: -1 });
    return commands;
  } catch (error) {
    throw new Error("Error retrieving Rokoko commands: " + error.message);
  }
};
