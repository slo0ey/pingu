import 'dotenv/config';

import { Client, Events, GatewayIntentBits, REST } from 'discord.js';
import interactionCreateListener from './listeners/interactionCreate';
import readyListener from './listeners/ready';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});
const rest = new REST().setToken(process.env.token!);

client.once(Events.ClientReady, readyListener(rest));
client.on(Events.InteractionCreate, interactionCreateListener);

client.login(process.env.token);
