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
         console.log(target);

         interaction.reply(`\`${target.user.tag}\`'s avatar: ${target.user.displayAvatarURL({ size: 1024, dynamic: true })}`);
      }
   }
}