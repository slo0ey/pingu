import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import ChatInputCommand from '../command';
import AuthService from '../services/auth';
import { singleton } from 'tsyringe';

@singleton()
class RegisterCommand extends ChatInputCommand {
  constructor(private readonly authService: AuthService) {
    super({ authRequired: false });
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const id = interaction.user.id;
    const user = await this.authService.getUser(id);
    if (user) {
      await interaction.reply({
        content: '계정이 생성되었습니다! :eyes:',
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await this.authService.createUser(id);
      await interaction.reply({
        content: '이미 계정이 존재합니다. :unamused:',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}

export const commandData = new SlashCommandBuilder()
  .setName('register')
  .setDescription('계정을 생성합니다.')
  .toJSON();

export default RegisterCommand;
