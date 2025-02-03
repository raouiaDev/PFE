const axios = require('axios');

const publishToFacebook = async (campaign) => {
    const { description } = campaign;
    const facebookPageId = process.env.FACEBOOK_PAGE_ID;
    const facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const url = `https://graph.facebook.com/v22.0/${facebookPageId}/feed`;

    try {
        const response = await axios.post(url, {
            message: description,
            access_token: facebookAccessToken
        });
        console.log(`🚀 Publication réussie sur Facebook : ${response.data.id}`);
    } catch (error) {
        console.error(`❌ Erreur de publication sur Facebook :`, error.response?.data || error.message);
    }
};

const publishToInstagram = async (campaign) => {
    const { description } = campaign;
    const instagramAccountId = process.env.INSTAGRAM_ACCOUNT_ID;
    const instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const url = `https://graph.facebook.com/v22.0/${instagramAccountId}/media`;

    try {
        const response = await axios.post(url, {
            caption: description,
            access_token: instagramAccessToken
        });
        console.log(`🚀 Publication réussie sur Instagram : ${response.data.id}`);
    } catch (error) {
        console.error(`❌ Erreur de publication sur Instagram :`, error.response?.data || error.message);
    }
};

const publishCampaign = async (campaign) => {
    try {
        if (campaign.publishToFacebook) await publishToFacebook(campaign);
        if (campaign.publishToInstagram) await publishToInstagram(campaign);

        campaign.status = "publié";
        await campaign.save();
        console.log(`✅ Campagne publiée : ${campaign.title}`);
    } catch (error) {
        console.error(`❌ Erreur de publication :`, error.message);
        campaign.status = "échec";
        await campaign.save();
    }
};

module.exports = { publishToFacebook, publishToInstagram, publishCampaign };
