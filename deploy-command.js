/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv/config');
const { REST, Routes } = require('discord.js');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

const commands = [];
const folderPath = join(__dirname, 'dist/commands');
const commandFiles = readdirSync(folderPath);

for (const file of commandFiles) {
  const command = new (require(join(folderPath, file)).default)();
  commands.push(command.commandData);
}

const rest = new REST().setToken(process.env.token);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    const data = await rest.put(
      Routes.applicationCommands(process.env.clientId),
      { body: commands },
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    console.error(error);
  }
})();
