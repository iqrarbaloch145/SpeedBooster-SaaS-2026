const express = require('express');
const router = express.Router();
const { getSites, addSite, deleteSite } = require('../controllers/siteController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getSites).post(protect, addSite);
router.route('/:id').delete(protect, deleteSite);

module.exports = router;
