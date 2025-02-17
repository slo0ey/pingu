import { EmbedBuilder } from 'discord.js';

export const lottoHelpEmbed = (avatar: string) =>
  new EmbedBuilder()
    .setColor(0x0f1112)
    .setAuthor({ name: '로또 가이드', iconURL: avatar })
    .setDescription(
      `로또는 \`로또\`, \`스피또 1000\`, \`스피또 2000\`, \`연금 복권\` 이렇게 4종류가 있으며, 대량구매 방지를 위해 건당 최대 10개 까지 구매 가능합니다.\n
각 로또의 시세는 아래와 같으며, 당첨금 및 당첨자 산정 방식에 대해서는 \`/lotto help (복권종류)\` 명령어를 통해 확인하세요.`,
    )
    .setThumbnail(
      'https://pbs.twimg.com/media/GQPJ4YAbIAAlL2P?format=jpg&name=large',
    )
    .addFields(
      { name: '로또', value: '개당 **1000눗**', inline: true },
      { name: '스피또 1000', value: '개당 **1000눗**', inline: true },
      { name: '스피또 2000', value: '개당 **2000눗**', inline: true },
      { name: '연금 복권', value: '개당 **1500눗**', inline: true },
    );
