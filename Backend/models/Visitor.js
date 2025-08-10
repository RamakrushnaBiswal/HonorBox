const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'site_stats'
    },
    count: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Visitor', VisitorSchema);