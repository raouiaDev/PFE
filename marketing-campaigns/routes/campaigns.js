const express = require('express');
const Campaign = require('../models/Campaign');
const { publishCampaign } = require('../services/socialMediaHelper');

const router = express.Router();

// Créer une nouvelle campagne
router.post('/', async (req, res) => {
    try {
        const { title, description, startDate, endDate, scheduledTime, publishToFacebook, publishToInstagram } = req.body;
        
        const newCampaign = new Campaign({
            title,
            description,
            startDate,
            endDate,
            scheduledTime,
            publishToFacebook,
            publishToInstagram
        });

        const savedCampaign = await newCampaign.save();
        res.status(201).json(savedCampaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Déclencher manuellement une publication
router.post('/publish/:id', async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: "Campagne non trouvée" });
        }

        await publishCampaign(campaign);
        res.status(200).json({ message: "Publication déclenchée avec succès !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
