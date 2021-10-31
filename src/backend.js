module.exports = () => {
   const express = require('express');
   const app = express();

   app.get('*', async (req, res) => {
      res.send({ status: 200, code: "MAIN_HOME" });
   });

   app.listen(process.env.PORT || 7000);
}