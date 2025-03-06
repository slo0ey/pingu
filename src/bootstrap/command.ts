import { container } from 'tsyringe';
import ChatInputCommand from '../command';
import { join } from 'path';
import { COMMAND_MAP } from '../constants/di';

export default async function registerAllCommands() {
  const commandMap = new Map<string, ChatInputCommand>();
  const commandFolder = join(__dirname, 'dist/commands');
  for (const file of commandFolder) {
    const bundle = await import(join(commandFolder, file));
    commandMap.set(bundle.name, container.resolve(bundle.default));
  }
  container.register(COMMAND_MAP, { useValue: commandMap });
}
