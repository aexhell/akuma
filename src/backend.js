module.exports = () => {
   const express = require('express');
   const app = express();

   app.get('*', async (req, res) => {
      res.send({ status: 200, message: "Nothing here." });
   });

   app.listen(3000);
}