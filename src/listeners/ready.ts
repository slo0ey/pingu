import { DataSource } from 'typeorm';
import {
  chatInputCommandMap,
  registerChatInputCommand,
} from '../utils/commandMap';
import { DATASOURCE } from '../constants/di';
import NodeCache from 'node-cache';
import InMemoryCacheProvider from 'typeorm-in-memory-cache';
import { container } from 'tsyringe';

async function readyListener() {
  console.log('Connect to db..');
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    synchronize: true,
    logging: true,
    timezone: '<LOCAL>',
    entities: ['dist/entities/*.js'],
    cache: {
      provider() {
        const cache = new NodeCache({
          stdTTL: 600,
          checkperiod: 120,
        });
        return new InMemoryCacheProvider(cache);
      },
    },
  });
  await dataSource.initialize();
  container.registerSingleton(DATASOURCE, DataSource);
  console.log('Connected to db!');

  console.log('Load all commands..');
  await registerChatInputCommand('../commands/register');
  await registerChatInputCommand('../commands/ping');
  await registerChatInputCommand('../commands/dice');
  await registerChatInputCommand('../commands/lotto');
  console.log(`${chatInputCommandMap.size} commands are loaded!`);

  console.log('Bot is ready!');
}

export default readyListener;
