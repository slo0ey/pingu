import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import ChatInputCommand from '../command';

class PingCommand extends ChatInputCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Common ping-pong command.'),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply({
      content: 'Pong! :ping_pong:',
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default PingCommand;
