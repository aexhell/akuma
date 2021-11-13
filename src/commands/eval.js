const chalk = require("chalk");
const { MessageEmbed } = require("discord.js");

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
         try {
            if (interaction.user.id !== '308938789592498176' && interaction.user.id !== '681991639040131117') return interaction.reply("You do not have access to this command.");
            
            function jsUcfirst(string) {
               return string.charAt(0).toUpperCase() + string.slice(1);
            }
            
            let author = interaction.user;
            let code = interaction.options.getString('code');
            let evaluated = eval(code);
            let evalEmbed = new MessageEmbed()
               .setTitle("Evaluated Item")
               .setColor("RANDOM")
               .setAuthor(author.tag, author.displayAvatarURL())
               .addField("Type", `\`\`\`prolog\n${jsUcfirst(typeof(evaluated))}\`\`\``, true)
               .addField("Evaluated in:", `\`\`\`yaml\n${new Date()-interaction.createdTimestamp} ms.\`\`\``, true)
               .addField("Input:", `\`\`\`js\n${code}\`\`\``, false)
               .addField("Output:", `\`\`\`fix\n${evaluated}\`\`\``, false);

            await interaction.reply({
               embeds: [evalEmbed]
            });
         } catch(err) {
            console.log(chalk`${chalk.red('warn')} ── Failed to execute code in eval\n${err}`);
         }
      }
   }
}
