const express = require("express");
const router = express.Router();
const { subscribe } = require("../controllers/NewsController");

// POST request to subscribe
router.post("/subscribe", subscribe);

module.exports = router;
