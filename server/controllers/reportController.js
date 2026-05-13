const Report = require('../models/Report');
const Site = require('../models/Site');
const { runLighthouseScan } = require('../services/lighthouseService');

const runScan = async (req, res) => {
  try {
    const { siteId, deviceType = 'desktop' } = req.body;

    const site = await Site.findById(siteId);

    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }

    if (site.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (deviceType === 'tablet' && req.user.plan !== 'pro') {
      return res.status(403).json({ message: 'Tablet scans require a Pro plan. Please upgrade.' });
    }

    // Run scan
    const scanResults = await runLighthouseScan(site.url, deviceType);

    // Save report
    const report = new Report({
      siteId: site._id,
      deviceType,
      performanceScore: scanResults.performanceScore,
      lcp: scanResults.lcp,
      cls: scanResults.cls,
      tbt: scanResults.tbt,
      issues: scanResults.issues,
    });

    const savedReport = await report.save();

    res.status(201).json(savedReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getReports = async (req, res) => {
  try {
    const { siteId } = req.params;
    
    const site = await Site.findById(siteId);
    
    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }

    if (site.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const reports = await Report.find({ siteId }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  runScan,
  getReports
};
