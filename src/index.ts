import 'dotenv/config';

import { Client, Events, GatewayIntentBits } from 'discord.js';
import interactionCreateListener from './listeners/interactionCreate';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

client.on(Events.InteractionCreate, interactionCreateListener);

client.login(process.env.token);
