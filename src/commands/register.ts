import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import ChatInputCommand from '../command';
import Container from 'typedi';
import AuthService from '../services/auth';

class RegisterCommand extends ChatInputCommand {
  private readonly authService: AuthService;

  constructor() {
    super({ authRequired: false });
    this.authService = Container.get(AuthService);
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const registerResult = await this.authService.checkUserAndRegister(
      interaction.user.id,
    );
    if (registerResult) {
      await interaction.reply({
        content: '계정이 생성되었습니다! :eyes:',
        flags: MessageFlags.Ephemeral,
      });
    } else {
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
