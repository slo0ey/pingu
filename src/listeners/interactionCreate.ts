import { Interaction, MessageFlags } from 'discord.js';
import { chatInputCommandMap } from '../utils/commandMap';

async function interactionCreateListener(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    const command = chatInputCommandMap.get(interaction.commandName);

    if (!command) {
      await interaction.reply({
        content: '그런 명령어는 없는데요 :unamused:',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      if (error === null || error === undefined) {
        console.log('UNKNOWN ERROR!!');
      } else {
        const err = error as Error;
        console.error(
          `Error occurred: ${err.message}
Cause: ${err.cause}
Stack: ${err.stack}`,
        );
      }
      await interaction.reply({
        content: '실행중 오류가 발생했습니다.. :cry:',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}

export default interactionCreateListener;
