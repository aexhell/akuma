const Discord = require('discord.js');
const chalk = require('chalk');
const backend = require("./backend.js");
const CommandHandler = require('./handler/command.js');
const commandHandler = new CommandHandler();
const dotenv = require('dotenv');
const client = new Discord.Client({
   ws: {
      properties: {
         $browser: 'Discord iOS'
      }
   },
   intents: [Discord.Intents.FLAGS.GUILDS]
});

dotenv.config();

client.on("interactionCreate", async (interaction) => {
   if (!interaction.isCommand()) {
       return;
   }
   
   const { commandName } = interaction;
   const command = commandHandler.commands.get(commandName);
   
   try {
       await command.run(interaction);
   } catch (exception) {
       await interaction.reply(`Sorry, but something went wrong. Please try again later.`);
       console.log(chalk`${chalk.red('warn')} ── Failed to execute ${commandName}`);
       console.log(exception);
   }
});

client.on('ready', async () => {
   await commandHandler.load();
   await commandHandler.run(client);

   console.log(chalk`${chalk.greenBright('done')} ── ${client.user.tag} is ready.`);
   client.user.setPresence({ activities: [{ name: '.' }], status: 'idle' });
   client.user.setActivity('.', { type: 'WATCHING' });
});

client.login(process.env.DISCORD);
backend();