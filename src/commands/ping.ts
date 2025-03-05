import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import ChatInputCommand from '../command';

class PingCommand extends ChatInputCommand {
  constructor() {
    super({ authRequired: false });
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply({
      content: 'Pong! :ping_pong:',
      flags: MessageFlags.Ephemeral,
    });
  }
}

export const commandData = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('봇의 응답 속도를 확인합니다.')
  .toJSON();

export default PingCommand;
