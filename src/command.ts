import {
  type ChatInputCommandInteraction,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';

abstract class ChatInputCommand {
  public readonly commandData: RESTPostAPIChatInputApplicationCommandsJSONBody;

  constructor(commandBuilder: RESTPostAPIChatInputApplicationCommandsJSONBody) {
    this.commandData = commandBuilder;
  }

  abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export default ChatInputCommand;
