const { Interaction } = require('discord.js');

module.exports = {
   name: "ping",
   description: "Pong!",
   options: [],
   run: async (interaction) => {
      if (interaction) interaction.reply(`Pong! ${Math.round(interaction.client.ws.ping)}ms`);
   }
}