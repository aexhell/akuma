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
            embed: {
               title: `${fetched.data.login}'s github`,
               url: fetched.data.html_url,
               fields: [
                  {
                     name: ":id::",
                     value: `\`${fetched.data.id}\`.`,
                     inline: true
                  },
                  {
                     name: 'Followers',
                     value: fetched.data.followers ? fetched.data.followers : 'None.',
                     inline: true
                  },
                  {
                     name: 'Bio',
                     value: fetched.data.bio ? fetched.data.bio : 'None.',
                     inline: true
                  },
                  {
                     name: 'Location',
                     value: fetched.data.location ? fetched.data.location : 'None.',
                     inline: true
                  },
                  {
                     name: 'Joined at',
                     value: `${fetched.data.created_at.substring(8,10)}/${fetched.data.created_at.substring(5,7)}/${fetched.data.created_at.substring(0,4)}`,
                     inline: true
                  },
                  {
                     name: 'Repositories',
                     value: fetched.data.public_repos ? `${fetched.data.public_repos} public ${fetched.data.public_repos === 1 ? 'repository' : 'repositories'}.` : 'None.',
                     inline: true
                  }
               ],
               thumbnail: {
                  url: fetched.data.avatar_url
               },
               footer: {
                  text: "Powered by GitHub",
                  icon_url: "https://github.com/fluidicon.png"
               },
               color: 'RANDOM'
            }
         });
      }
   }
}