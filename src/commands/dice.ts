import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import ChatInputCommand from '../command';
import { randInt } from '../utils/math';
import { singleton } from 'tsyringe';

@singleton()
class DiceCommand extends ChatInputCommand {
  constructor() {
    super({ authRequired: false });
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    let min = interaction.options.getInteger('min');
    let max = interaction.options.getInteger('max');
    const user = interaction.options.getUser('user');

    min = min === null ? 1 : min;
    max = max === null ? 6 : max;
    if (min >= max) {
      await interaction.reply('뭔가 이상하지 않나요..? :thinking:');
      return;
    }

    const dice = randInt(min, max);
    if (user === null) {
      await interaction.reply(`주사위의 숫자는 \`${dice}\`! :game_die:`);
    } else {
      const dice2 = randInt(min, max);
      await interaction.reply(
        `<@${interaction.user.id}> 님의 주사위는 \`${dice}\`! :game_die:\n<@${user.id}> 님의 주사위는 \`${dice2}\` :game_die:!`,
      );
    }
  }
}

export const commandData = new SlashCommandBuilder()
  .setName('dice')
  .setDescription('주사위를 굴립니다.')
  .addIntegerOption((option) =>
    option
      .setName('min')
      .setDescription('주사위에서 나올 최소 숫자를 지정합니다. (최소값: 1)')
      .setMinValue(1),
  )
  .addIntegerOption((option) =>
    option
      .setName('max')
      .setDescription('주사위에서 나올 최대 숫자를 지정합니다. (최대값: 65535)')
      .setMaxValue(65535),
  )
  .addUserOption((option) =>
    option
      .setName('user')
      .setDescription('주사위 수를 비교할 상대를 지목합니다.'),
  )
  .toJSON();

export default DiceCommand;
