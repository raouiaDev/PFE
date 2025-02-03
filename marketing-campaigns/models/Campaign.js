const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    scheduledTime: { type: Date, required: true },
    status: { type: String, enum: ['en attente', 'publié', 'échec'], default: 'en attente' },
    publishToFacebook: { type: Boolean, default: false },
    publishToInstagram: { type: Boolean, default: false },
    imageUrl: { type: String, required: false }  // Ajout du champ imageUrl pour l'image Instagram
});

module.exports = mongoose.model('Campaigns', campaignSchema);
