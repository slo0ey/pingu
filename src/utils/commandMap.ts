import Container from 'typedi';
import ChatInputCommand from '../command';

export const chatInputCommandMap = new Map<string, ChatInputCommand>();

export async function registerChatInputCommand(commandFilePath: string) {
  const bundle = await import(commandFilePath);
  chatInputCommandMap.set(bundle.name, Container.get(bundle.default));
}
