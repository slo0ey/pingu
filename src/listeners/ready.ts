import { REST, Routes } from 'discord.js';
import PingCommand from '../commands/ping';
import {
  chatInputCommandMap,
  registerChatInputCommand,
} from '../utils/commandMap';
import DiceCommand from '../commands/dice';

function readyListener(rest: REST) {
  return async () => {
    console.log('Registering commands..');
    registerChatInputCommand(new PingCommand());
    registerChatInputCommand(new DiceCommand());

    const commands = [...chatInputCommandMap.values()];
    console.log(`${commands.length} commands are loaded!`);

    await rest.put(Routes.applicationCommands(process.env.clientId!), {
      body: commands.map((v) => v.commandData),
    });
    console.log('Bot Ready!');
  };
}

export default readyListener;
