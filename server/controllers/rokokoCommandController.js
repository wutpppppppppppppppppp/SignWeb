import { saveRokokoCommand, getRokokoCommands } from '../services/rokokoService';

export const createRokokoCommand = async (req, res) => {
  const { commandType, ipAddress, port, apiKey } = req.body;

  try {
    const command = await saveRokokoCommand(commandType, ipAddress, port, apiKey);
    res.status(201).json(command);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const listRokokoCommands = async (req, res) => {
  try {
    const commands = await getRokokoCommands();
    res.status(200).json(commands);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};