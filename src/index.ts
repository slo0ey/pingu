import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

client.once(Events.ClientReady, () => {
  console.log('Bot Ready!');
});

client.login(process.env.token);
