const Tesseract = require('tesseract.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
   name: "ocr",
   description: "Image to text",
   options: [
      {
         name: 'url',
         type: 3,
         description: 'Image URL',
         required: true
      }
   ],
   run: async (interaction) => {
      if (interaction) {
         await interaction.deferReply();

         await Tesseract.recognize(
            interaction.options.getString('url'),
            'eng',
            { logger: m => console.log(m) }
          ).then(async ({ data: { text } }) => {
            console.log(text);

            let embed = new MessageEmbed()
               .setColor('RANDOM')
               .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
               .setThumbnail(interaction.options.getString('url'))
               .setDescription(`\`\`\`${text}\`\`\``);

            await interaction.editReply({
               embeds: [embed]
            });
          });
      }
   }
}