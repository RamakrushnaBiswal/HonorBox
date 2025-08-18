const express = require('express');
const router = express.Router();
const { getAndIncrementVisitorCount } = require('../controllers/visitorController');

// GET /api/visitors/count
router.get('/count', getAndIncrementVisitorCount);

module.exports = router;