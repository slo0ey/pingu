import 'reflect-metadata';
import 'dotenv/config';

import { Client, Events, GatewayIntentBits } from 'discord.js';
import interactionCreateListener from './listeners/interactionCreate';
import readyListener from './listeners/ready';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

client.once(Events.ClientReady, readyListener);
client.on(Events.InteractionCreate, interactionCreateListener);

client.login(process.env.token);
