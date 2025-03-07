import { container, delay } from 'tsyringe';
import ChatInputCommand from '../command';
import { join } from 'path';
import { readdirSync } from 'fs';
import { COMMAND_MAP } from '../constants/di';

export default async function registerAllCommands() {
  const commandMap = new Map<string, ChatInputCommand>();
  const commandFolderPath = join(__dirname, '../commands');
  const commandFolder = readdirSync(commandFolderPath);
  for (const file of commandFolder) {
    const bundle = await import(join(commandFolderPath, file));
    commandMap.set(bundle.name, container.resolve(delay(() => bundle.default)));
  }
  container.register(COMMAND_MAP, { useValue: commandMap });
}
