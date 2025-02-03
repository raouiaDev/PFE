const cron = require('node-cron');
const Campaign = require('../models/Campaign');
const { publishCampaign } = require('../services/socialMediaHelper');

cron.schedule('*/1 * * * *', async () => {
    console.log('⏳ Vérification des campagnes planifiées...');
    
    const campaigns = await Campaign.find({ status: 'en attente' });
    const currentTime = new Date();

    campaigns.forEach(async (campaign) => {
        const scheduledTime = new Date(campaign.scheduledTime);
        
        if (scheduledTime <= currentTime) {
            console.log(`📅 Déclenchement de la campagne : ${campaign.title}`);
            await publishCampaign(campaign);
        }
    });
});

module.exports = { cron };
