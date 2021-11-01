const _ = require("node-fetch");

module.exports = {
   name: 'github',
   description: 'Get an user\'s GitHub',
   options: [
      {
         name: 'target',
         type: 3,
         description: 'GitHub username',
         required: true
      }
   ],
   run: async (interaction) => {
      if (interaction) {
         let target = interaction.options.getString('target');
         let fetched = await _(`https://api.github.com/users/${target}`);

         console.log(fetched.body);

         interaction.reply({
            embeds: [
               {
                  title: `${fetched.body.login}'s github`,
                  color: 'RANDOM'
               }
            ]
         });
      }
   }
}