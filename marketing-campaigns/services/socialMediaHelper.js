const axios = require('axios');
require('dotenv').config();

// Fonction pour publier sur Facebook avec une image
const publishToFacebook = async (campaign) => {
    const { description, imageUrl } = campaign;
    const url = `https://graph.facebook.com/v22.0/${process.env.FACEBOOK_PAGE_ID}/photos`;

    try {
        const response = await axios.post(url, {
            url: imageUrl,
            caption: description,
            access_token: process.env.FACEBOOK_ACCESS_TOKEN,
        });
        console.log(`🚀 Publication réussie sur Facebook avec l'image : ${response.data.id}`);
    } catch (error) {
        console.error(`❌ Erreur de publication sur Facebook :`, error.response?.data || error.message);
    }
};

// Fonction pour publier sur Instagram avec une image
const publishToInstagram = async (campaign) => {
    const { imageUrl, description } = campaign;
    const instagramAccountId = process.env.INSTAGRAM_ACCOUNT_ID;
    const instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    try {
        // Étape 1 : Télécharger l'image sur Instagram
        const mediaUploadUrl = `https://graph.facebook.com/v22.0/${instagramAccountId}/media`;
        const mediaResponse = await axios.post(mediaUploadUrl, {
            image_url: imageUrl,
            caption: description,
            access_token: instagramAccessToken,
        });

        console.log(`🚀 Image téléchargée sur Instagram : ${mediaResponse.data.id}`);

        // Étape 2 : Publier le média téléchargé sur Instagram
        const publishUrl = `https://graph.facebook.com/v22.0/${instagramAccountId}/media_publish`;
        const publishResponse = await axios.post(publishUrl, {
            creation_id: mediaResponse.data.id,
            access_token: instagramAccessToken,
        });

        console.log(`🚀 Publication réussie sur Instagram : ${publishResponse.data.id}`);
    } catch (error) {
        console.error(`❌ Erreur de publication sur Instagram : ${error.message}`);
    }
};

module.exports = { publishToFacebook, publishToInstagram };
