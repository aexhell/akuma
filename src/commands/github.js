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
      const axios = require("axios");

      if (interaction) {
         let target = interaction.options.getString('target');
         let fetched = await axios(`https://api.github.com/users/${target}`);

         console.log(fetched.data);

         interaction.reply({
            embeds: [
               {
                  title: `${fetched.data.login}'s github`,
                  color: 'RANDOM'
               }
            ]
         });
      }
   }
}