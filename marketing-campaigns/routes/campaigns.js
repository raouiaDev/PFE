const express = require('express');
const Campaign = require('../models/Campaign');
const { publishCampaign } = require('../services/campaignScheduler');
const router = express.Router();

// Route pour créer une campagne
router.post('/', async (req, res) => {
    const { 
        title, 
        description, 
        startDate, 
        endDate, 
        scheduledTime, 
        publishToFacebook, 
        publishToInstagram, 
        imageUrl 
    } = req.body;

    // Créer un nouvel objet Campaign avec les données reçues
    const newCampaign = new Campaign({
        title,
        description,
        startDate,
        endDate,
        scheduledTime,
        publishToFacebook,
        publishToInstagram,
        imageUrl, // Inclure l'URL de l'image dans la campagne
        status: 'en attente', // Statut initial
    });

    try {
        // Sauvegarder la campagne dans la base de données
        const savedCampaign = await newCampaign.save();

        // Vérifier si la publication doit être immédiate (si la date de planification est déjà passée)
        if (new Date(scheduledTime) <= new Date()) {
            await publishCampaign(savedCampaign); // Publier immédiatement si la date est passée
        } else {
            console.log(`⏳ Publication planifiée pour ${scheduledTime}`);
        }

        // Retourner la réponse avec la campagne créée
        res.status(201).json(savedCampaign);
    } catch (error) {
        // Gérer les erreurs
        res.status(400).json({ message: error.message });
    }
});




router.get('/', async (req, res) => {
  try {
      const campaigns = await Campaign.find();
      res.status(200).json(campaigns); // Retourne toutes les campagnes en JSON
  } catch (error) {
      res.status(500).json({ message: error.message }); // Retourne un message d'erreur en cas d'échec
  }
});

module.exports = router;
