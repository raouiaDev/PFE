const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    message: { type: String, required: true },
    imageUrl: { type: String, required: false },
    scheduledTime: { type: Date, required: true },
    status: { type: String, enum: ["en attente", "publié", "échec"], default: "en attente" }
});

module.exports = mongoose.model("Post", PostSchema);
