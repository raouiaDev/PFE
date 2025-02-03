const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json()); // Permet de parser les requêtes en JSON
app.use(cors()); // Active CORS

// Importer les routes des campagnes
const campaignRoutes = require('./routes/campaigns'); 
app.use('/api/campaigns', campaignRoutes); // 🔥 Correction ici

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connexion MongoDB réussie'))
.catch(err => console.error('❌ Erreur MongoDB:', err));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
