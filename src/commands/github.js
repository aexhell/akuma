const { MessageEmbed } = require("discord.js");

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

         let embed = new MessageEmbed()
            .setTitle(`${fetched.data.login}'s github`)
            .setURL(fetched.data.html_url)
            .setFooter('GitHub', "https://github.com/fluidicon.png")
            .setThumbnail(fetched.data.avatar_url)
            .setColor('RANDOM')
            // add GitHub fields
            .addField(":id::", `\`${fetched.data.id}\`.`, true)
            .addField('Followers', fetched.data.followers ? fetched.data.followers : 'None.', true)
            .addField('Bio', fetched.data.bio ? fetched.data.bio : 'None.', true)
            .addField('Location', fetched.data.location ? fetched.data.location : 'None.', true)
            .addField('Joined at', `${fetched.data.created_at.substring(8,10)}/${fetched.data.created_at.substring(5,7)}/${fetched.data.created_at.substring(0,4)}`, true)
            .addField('Repositories', fetched.data.public_repos ? `${fetched.data.public_repos} public ${fetched.data.public_repos === 1 ? 'repository' : 'repositories'}.` : 'None.', true)

         interaction.reply({
            embeds: [embed]
         });
      }
   }
}