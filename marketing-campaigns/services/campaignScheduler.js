const cron = require('node-cron');
const { publishToFacebook, publishToInstagram } = require('./socialMediaHelper');
const Campaign = require('../models/Campaign');

const publishCampaign = async (campaign) => {
    try {
        if (campaign.publishToFacebook) {
            await publishToFacebook(campaign);
        }

        if (campaign.publishToInstagram) {
            await publishToInstagram(campaign);
        }

        campaign.status = "publié";
        await campaign.save();
        console.log(`✅ Campagne publiée : ${campaign.title}`);
    } catch (error) {
        console.error(`❌ Erreur de publication : ${error.message}`);
        campaign.status = "échec";
        await campaign.save();
    }
};

// Vérifier chaque minute si une publication doit être déclenchée
cron.schedule('* * * * *', async () => {
    console.log('⏳ Vérification des campagnes planifiées...');
    const campaigns = await Campaign.find({ status: 'en attente' });

    campaigns.forEach(async (campaign) => {
        const scheduledTime = new Date(campaign.scheduledTime);
        const currentTime = new Date();

        if (scheduledTime <= currentTime) {
            console.log(`📅 Publication de la campagne : ${campaign.title}`);
            await publishCampaign(campaign);
        }
    });
});

module.exports = { publishCampaign };
