const express = require('express');
const router = express.Router();
const { runOptimization } = require('../controllers/optimizeController');
const { protect } = require('../middleware/auth');

router.post('/run', protect, runOptimization);

module.exports = router;
