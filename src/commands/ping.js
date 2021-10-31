const { Interaction } = require('discord.js');

module.exports = {
   name: "ping",
   description: "Pong!",
   run: async (interaction) => {
      interaction.reply(`Pong! ${Math.round(interaction.client.ws.ping)}ms`);
   }
}