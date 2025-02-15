import { REST, Routes } from 'discord.js';
import PingCommand from '../commands/ping';
import {
  chatInputCommandMap,
  registerChatInputCommand,
} from '../utils/commandMap';

function readyListener(rest: REST) {
  return async () => {
    console.log('Registering commands..');
    registerChatInputCommand(new PingCommand());

    const commands = [...chatInputCommandMap.values()];
    await rest.put(Routes.applicationCommands(process.env.clientId!), {
      body: commands.map((v) => v.commandData),
    });
    console.log('Bot Ready!');
  };
}

export default readyListener;
