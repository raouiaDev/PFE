const express = require('express');
const FB = require('fb'); // SDK Facebook pour Node.js
const router = express.Router();


// Route POST pour publier sur Facebook
router.post('/api/facebook/post', async (req, res) => {
  const { message, accessToken, pageId } = req.body;

  FB.setAccessToken(accessToken); // Définir le token d'accès

  const postData = {
    message: message,
  };

  FB.api(`${pageId}/feed`, 'post', postData, (response) => {
    if (response.error) {
      return res.status(500).json({ message: response.error.message });
    }
    res.status(200).json({ message: 'Publication réussie', data: response });
  });
});

module.exports = router;
