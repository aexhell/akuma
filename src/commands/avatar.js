module.exports = {
   name: 'avatar',
   description: 'Get an user\'s avatar',
   options: [
      {
         name: 'target',
         type: 6,
         description: 'Select an user.',
         required: true
      }
   ],
   run: async (interaction) => {
      if (interaction) {
         let target = interaction.options.getUser('target');

         interaction.reply(`\`${target.tag}\`'s avatar: ${target.displayAvatarURL({ size: 1024, dynamic: true })}`);
      }
   }
}