import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import ChatInputCommand from '../command';
import { lottoHelpEmbed } from '../embeds/lotto';

class LottoCommand extends ChatInputCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
        .setName('lotto')
        .setDescription('로또 관련 명령어 입니다. 자세한 설명은 /lotto help')
        .addSubcommand((subcommand) =>
          subcommand
            .setName('help')
            .setDescription('로또 명령어의 사용법을 확인합니다.')
            .addStringOption((option) =>
              option
                .setName('type')
                .setDescription('당첨 방식을 확인 할 로또의 종류')
                .addChoices(
                  { name: '로또', value: 'lotto' },
                  { name: '스피또 1000', value: 'spd1000' },
                  { name: '스피또 2000', value: 'spd2000' },
                  { name: '연금 복권', value: 'ltlotto' },
                ),
            ),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('buy')
            .setDescription('로또를 구매합니다.')
            .addStringOption((option) =>
              option
                .setName('type')
                .setDescription('구매 할 로또의 종류')
                .setRequired(true)
                .addChoices(
                  { name: '로또', value: 'lotto' },
                  { name: '스피또 1000', value: 'spd1000' },
                  { name: '스피또 2000', value: 'spd2000' },
                  { name: '연금 복권', value: 'ltlotto' },
                ),
            )
            .addIntegerOption((option) =>
              option
                .setName('count')
                .setDescription('구매할 로또의 갯수')
                .setMinValue(1)
                .setMaxValue(10),
            ),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName('result')
            .setDescription(
              '지난 회차 로또의 결과를 확인합니다. (당첨금도 함께 지급합니다.)',
            ),
        )
        .toJSON(),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const subcommand = interaction.options.getSubcommand();
    const avatar = interaction.client.user.avatarURL()!;

    if (subcommand === 'help') {
      const type = interaction.options.getString('type', false);
      if (type === null) {
        await interaction.reply({
          embeds: [lottoHelpEmbed(avatar)],
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: '명령어 형식이 올바르지 않아요. :weary:',
          flags: MessageFlags.Ephemeral,
        });
      }
    } else {
      await interaction.reply({
        content: '명령어 형식이 올바르지 않아요. :weary:',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}

export default LottoCommand;
