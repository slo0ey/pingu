import {
  type ChatInputCommandInteraction,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from 'discord.js';

abstract class ChatInputCommand {
  public readonly commandData: RESTPostAPIChatInputApplicationCommandsJSONBody;

  constructor(commandBuilder: SlashCommandBuilder) {
    this.commandData = commandBuilder.toJSON();
  }

  abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export default ChatInputCommand;
