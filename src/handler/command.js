const Discord = require('discord.js');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
const chalk = require('chalk');
const dotenv = require("dotenv");
dotenv.config();

module.exports = class CommandHandler {
   constructor() {
      this.commands = new Map();
      this.commandsData = [];
      this.rest = new REST({ version: '9' }).setToken(process.env.DISCORD);
   }

   async register(command) {
      this.commands.set(command.name, command);
      this.commandsData.push({ name: command.name, description: command.description });
   }

   async load() {
      const dir = readdirSync('./src/commands').filter((file) => file.endsWith('.js'));

      for (let file of dir) {
         let command = require(`../commands/${file}`);
         
         if (!command.name) {
            console.log(chalk`${chalk.red('warn')} ── Failed to load ${file}`);
            continue;
         }

         await this.register(command);
         console.log(chalk`${chalk.blue('info')} ── Successfully loaded ${file.split('.js')[0]} command`);
      }
   }

   async run(client) {
      console.log(chalk`${chalk.yellow('load')} ── Started refreshing application (/) commands. (${this.commandsData.length})`);
      await this.rest.put(
         Routes.applicationCommands(process.env.CLIENT_ID),
         { body: this.commandsData },
      );
      console.log(chalk`${chalk.green('load')} ── Finished reloading application (/) commands. (${this.commandsData.length})`);
  }
}