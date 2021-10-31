const chalk = require("chalk");

module.exports = {
   name: 'eval',
   description: 'Evaluate JavaScript code',
   options: [
      {
         name: 'code',
         type: 3,
         description: 'JavaScript code.',
         required: true
      }
   ],
   run: async (interaction) => {
      if (interaction) {
         if (interaction.user.id !== '308938789592498176') return interaction.reply("You do not have access to this command.");
         
         function jsUcfirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
         }
         
         let author = interaction.user;
         let code = interaction.options.getString('code');
         try {
            let evaluated = eval(code);
            let evalEmbed = {
               title: "Evaluated Item",
               color: "RANDOM",
               author: {
                  name: author.tag,
                  icon_url: author.displayAvatarURL()
               },
               fields: [
                  {
                     name: "Type",
                     value: `\`\`\`prolog\n${jsUcfirst(typeof(evaluated))}\`\`\``,
                     inline: true
                  },
                  {
                     name: "Evaluated in:",
                     value: `\`\`\`yaml\n${new Date()-interaction.createdTimestamp} ms.\`\`\``,
                     inline: true
                  },
                  {
                     name: "Input:",
                     value: `\`\`\`js\n${code}\`\`\``,
                     inline: false
                  },
                  {
                     name: "Output:",
                     value: `\`\`\`fix\n${evaluated}\`\`\``,
                     inline: false
                  }
               ]
            }
            message.channel.send({ embed: evalEmbed });
         } catch(err) {
            interaction.reply(err);
            console.log(chalk`${chalk.red('warn')} ── Failed to execute code in eval\n${err}`);
         }
      }
   }
}