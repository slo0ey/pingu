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

    if (command.isDeveloperCommand()) {
      if (interaction.user.id !== process.env.devId) {
        await interaction.reply({
          content: '해당 명령어는 개발자만 사용할 수 있습니다.. :x:',
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
    }

    if (command.isAuthRequired(interaction)) {
      await interaction.reply({
        content: '유저 등록이 필요한 명령어입니다! `/register` :sunglasses:',
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      if (error === null || error === undefined) {
        console.log('UNKNOWN ERROR!!');
      } else {
        const err = error as Error;
        console.error(`Error occurred: ${err.message}`);
        console.error(`Cause: ${err.cause}`);
        console.error(`Stack: ${err.stack}`);
      }
      await interaction.reply({
        content: '실행중 오류가 발생했습니다.. :cry:',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}

export default interactionCreateListener;
