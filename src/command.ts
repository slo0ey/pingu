import { type ChatInputCommandInteraction } from 'discord.js';
import BotUser from './entities/user.entity';

type ChatInputCommandOption = {
  authRequired:
    | ((interaction: ChatInputCommandInteraction) => boolean)
    | boolean;
  devOnly?: boolean;
};

abstract class ChatInputCommand {
  private readonly authRequired;
  private readonly devOnly;

  constructor({ authRequired, devOnly }: ChatInputCommandOption) {
    if (typeof authRequired === 'boolean') {
      this.authRequired = () => authRequired;
    } else {
      this.authRequired = authRequired;
    }
    this.devOnly = devOnly ?? false;
  }

  isAuthRequired(interaction: ChatInputCommandInteraction) {
    return this.authRequired(interaction);
  }

  isDeveloperCommand() {
    return this.devOnly;
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {}
  async executeWithUser(
    interaction: ChatInputCommandInteraction,
    botUser: BotUser,
  ): Promise<void> {}
}

export default ChatInputCommand;
