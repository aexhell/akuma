const { Interaction } = require('discord.js');

module.exports = {
   name: 'ping',
   description: 'Pong!',
   options: [
      {
         name: 'target',
         type: 'USER',
         description: 'Select an user.',
         required: false
      }
   ],
   run: async (interaction) => {
      if (typeof interaction === Interaction) {
         let target = interaction.options.getUser('target') || interaction.member;

         interaction.reply(`\`${target.user.tag}\`'s avatar: ${target.user.displayAvatarURL({ size: 1024, dynamic: true })}`);
      }
   }
}