const Tesseract = require('tesseract.js');

module.exports = {
   name: "ocr",
   description: "Image to text",
   options: [
      {
         name: 'url',
         type: 3,
         description: 'Image URL'
      }
   ],
   run: async (interaction) => {
      if (interaction) {
         Tesseract.recognize(
            interaction.options.getString('url'),
            'eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            console.log(text);
          })
      }
   }
}