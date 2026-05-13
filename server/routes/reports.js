const express = require('express');
const router = express.Router();
const { runScan, getReports } = require('../controllers/reportController');
const { protect } = require('../middleware/auth');

router.post('/run', protect, runScan);
router.get('/site/:siteId', protect, getReports);

module.exports = router;
