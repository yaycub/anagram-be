const { Router } = require('express');
const anagramica = require('anagramica');

module.exports = Router()
  .post('/', async(req, res) => {
    try {
      anagramica.all(req.body.word, function(error, response) {
        if(error) {
          throw error;
        }
   
        res.send(response.all);
      });
    }
    catch(err){
      return err;
    }  
  });
