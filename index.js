const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = require('./config.json')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

const commands = [
  {
    name: 'ding',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(token.token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands("1000026083615330385", "966764890419249223"), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ding') {
    await interaction.reply('teri behan ki ding ding!');
  }
});

client.login(token.token);