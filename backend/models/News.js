const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    author: { type: String },
    timestamp: { 
        type: mongoose.Schema.Types.Mixed, 
        default: Date.now 
    },
    imageUrl: { type: String },
    content: { type: String },
    url: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    scrapedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', newsSchema);
