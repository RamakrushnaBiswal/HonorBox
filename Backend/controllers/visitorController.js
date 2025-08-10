const Visitor = require('../models/Visitor');

// Increments visitor count and returns it
exports.getAndIncrementVisitorCount = async (req, res) => {
    try {
        const stats = await Visitor.findOneAndUpdate(
            { name: 'site_stats' },   // Filter to find the document
            { $inc: { count: 1 } },   // Increment the 'count' field by 1
            { new: true, upsert: true } // Options: return the updated doc, and create it if it doesn't exist
        );
        res.status(200).json({ count: stats.count });
    } catch (error) {
        console.error('Error updating visitor count:', error);
        res.status(500).json({ message: 'Server error' });
    }
};