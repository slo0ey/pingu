import { container } from 'tsyringe';
import ChatInputCommand from '../command';

export const chatInputCommandMap = new Map<string, ChatInputCommand>();

export async function registerChatInputCommand(commandFilePath: string) {
  const bundle = await import(`${commandFilePath}.js`);
  chatInputCommandMap.set(bundle.name, container.resolve(bundle.default));
}
