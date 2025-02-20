import { EmbedBuilder } from 'discord.js';

export const lottoHelpEmbed = (avatar: string) =>
  new EmbedBuilder()
    .setColor(0x0f1112)
    .setAuthor({ name: '로또 가이드', iconURL: avatar })
    .setDescription(
      `로또는 \`로또\`, \`즉석복권\` 이렇게 2종류가 있으며, 대량구매 방지를 위해 일일 판매수량이 제한되어 있으며 또한 건당 최대 10개 까지 구매 가능합니다.\n
각 로또의 시세는 아래와 같으며, 당첨금 및 당첨자 산정 방식에 대해서는 \`/lotto help (복권종류)\` 명령어를 통해 확인하세요.`,
    )
    .setThumbnail(
      'https://pbs.twimg.com/media/GQPJ4YAbIAAlL2P?format=jpg&name=large',
    )
    .addFields(
      { name: '로또', value: '개당 **1000눗**', inline: true },
      { name: '즉석복권', value: '개당 **1000눗**', inline: true },
    );
