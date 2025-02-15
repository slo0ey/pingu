import ChatInputCommand from '../command';

export const chatInputCommandMap = new Map<string, ChatInputCommand>();

export function registerChatInputCommand(command: ChatInputCommand) {
  chatInputCommandMap.set(command.commandData.name, command);
}
