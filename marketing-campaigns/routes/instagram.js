const express = require('express');
const axios = require('axios');
const router = express.Router();

// Publier une image sur Instagram
router.post('/api/instagram/post', async (req, res) => {
    const { imageUrl, caption, accessToken, instagramAccountId } = req.body;

    try {
        // Étape 1 : Télécharger l'image sur Instagram (Media Container)
        const mediaResponse = await axios.post(
            `https://graph.facebook.com/v18.0/${instagramAccountId}/media`,
            {
                image_url: imageUrl,
                caption: caption,
                access_token: accessToken
            }
        );

        const creationId = mediaResponse.data.id;

        // Étape 2 : Publier l'image (Media Publish)
        const publishResponse = await axios.post(
            `https://graph.facebook.com/v18.0/${instagramAccountId}/media_publish`,
            {
                creation_id: creationId,
                access_token: accessToken
            }
        );

        res.status(200).json({
            message: "Publication réussie sur Instagram",
            data: publishResponse.data
        });

    } catch (error) {
        console.error("Erreur de publication :", error.response.data);
        res.status(500).json({
            message: "Erreur lors de la publication sur Instagram",
            error: error.response.data
        });
    }
});

module.exports = router;
