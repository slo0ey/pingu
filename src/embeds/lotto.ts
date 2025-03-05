import { EmbedBuilder } from 'discord.js';
import { lottoSpdResult } from '../constants/lotto';

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

export const lottoBuySpdEmbed = (avatar: string, result: number[]) =>
  new EmbedBuilder()
    .setColor(0x0f1112)
    .setAuthor({ name: '즉석복권 당첨 결과', iconURL: avatar })
    .setDescription(
      '즉석복권 당첨 결과입니다. 다음에 또 이용해주세요! :saluting_face:',
    )
    .setThumbnail(
      'https://blog.shift.moe/wp-content/uploads/2017/08/Shut-up-and-take-my-money-1024x640.jpg',
    )
    .addFields(
      result.map((v) => {
        if (v === 6)
          return {
            name: ':cry: 6등 당첨..',
            value: '아쉽지만 다음 기회에..',
            inline: true,
          };
        return {
          name: `:tada: ${v}등 당첨!`,
          value: `축하드립니다! **+${lottoSpdResult[v]}눗**`,
          inline: true,
        };
      }),
    );
