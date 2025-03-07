import 'reflect-metadata';
import 'dotenv/config';

import { Client, GatewayIntentBits } from 'discord.js';
import InteractionCreateListener from './listeners/interactionCreate';
import { container } from 'tsyringe';
import initializeDatabase from './bootstrap/database';
import registerAllCommands from './bootstrap/command';

async function run() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
  });

  await initializeDatabase();
  await registerAllCommands();
  client.once('ready', () => console.log('Bot ready!'));

  const listener = container.resolve(InteractionCreateListener);
  listener.listen(client);

  client.login(process.env.token);
}

run();
