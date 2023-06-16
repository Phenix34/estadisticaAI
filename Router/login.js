const express = require('express');

  const router = express.Router();
 
  const ChatController = require('../Controller/ChatController');

  
  
router.post('/chat',ChatController.chat);
  router.get('/', async (req, res) => {
    try {
      res.render('chat');
    } catch (error) {
      // Maneja cualquier otro error que pueda ocurrir
      console.error(error);
      res.status(500).send('Error al buscar el caso');
    }
  });
  

module.exports = router;