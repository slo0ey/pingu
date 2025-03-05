import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import ChatInputCommand from '../command';
import { lottoBuySpdEmbed, lottoHelpEmbed } from '../embeds/lotto';
import { safeRand } from '../utils/math';
import { lottoSpdProb } from '../constants/lotto';
import { BotUser } from '../entities/user.entity';

type LottoType = 'lotto' | 'spd';

class LottoCommand extends ChatInputCommand {
  constructor() {
    super({
      authRequired: (interaction) =>
        interaction.options.getSubcommand() !== 'help',
    });
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const avatar = interaction.client.user.avatarURL()!;

    const type = interaction.options.getString('type', false) as LottoType;
    if (type === null) {
      await interaction.reply({
        embeds: [lottoHelpEmbed(avatar)],
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: '아직 개발중이에요. :tools:',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  async executeWithUser(
    interaction: ChatInputCommandInteraction,
    botUser: BotUser,
  ): Promise<void> {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'buy') {
      const type = interaction.options.getString('type', false) as LottoType;
      await this.buy(interaction, type);
    } else if (subcommand === 'result') {
      await this.result(interaction);
    } else {
      await interaction.reply({
        content: '명령어 형식이 올바르지 않아요. :weary:',
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  // TODO: /lotto buy
  private async buy(
    interaction: ChatInputCommandInteraction,
    type: LottoType,
  ): Promise<void> {
    const avatar = interaction.client.user.avatarURL()!;

    if (type === 'lotto') {
      await interaction.reply({
        content: '아직 개발중이에요. :tools:',
        flags: MessageFlags.Ephemeral,
      });
    } else if (type === 'spd') {
      const count = interaction.options.getInteger('count') ?? 1;
      const result: number[] = new Array(count).fill(0).map(() => {
        const random = safeRand();
        for (let i = 1; i <= 6; i++) {
          if (random <= lottoSpdProb[i]) return i;
        }
        return 6;
      });

      await interaction.reply({
        embeds: [lottoBuySpdEmbed(avatar, result)],
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  // TODO: /lotto result
  private async result(
    interaction: ChatInputCommandInteraction,
  ): Promise<void> {
    await interaction.reply({
      content: '아직 개발중이에요. :tools:',
      flags: MessageFlags.Ephemeral,
    });
  }
}

export const commandData = new SlashCommandBuilder()
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
            { name: '즉석복권', value: 'spd' },
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
            { name: '즉석복권', value: 'spd' },
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
  .toJSON();

export default LottoCommand;
