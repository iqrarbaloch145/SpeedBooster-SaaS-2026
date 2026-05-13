const Site = require('../models/Site');

const Report = require('../models/Report');

const getSites = async (req, res) => {
  try {
    const sites = await Site.find({ userId: req.user._id });
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addSite = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'Please provide a URL' });
    }

    if (req.user.plan !== 'pro') {
      const siteCount = await Site.countDocuments({ userId: req.user._id });
      if (siteCount >= 1) {
        return res.status(403).json({ message: 'Free plan is limited to 1 website. Please upgrade to Pro.' });
      }
    }

    const site = new Site({
      userId: req.user._id,
      url,
      apiKey: require('crypto').randomBytes(16).toString('hex'),
    });

    const createdSite = await site.save();
    res.status(201).json(createdSite);
  } catch (error) {
    console.error('Error adding site:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const deleteSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);

    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }

    if (site.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Report.deleteMany({ siteId: site._id });
    await site.deleteOne();

    res.json({ message: 'Site removed' });
  } catch (error) {
    console.error('Error deleting site:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getSites,
  addSite,
  deleteSite,
};
