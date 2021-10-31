const { Interaction } = require('discord.js');

module.exports = {
   name: 'avatar',
   description: 'Get an user\'s avatar',
   options: [
      {
         name: 'target',
         type: 2,
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