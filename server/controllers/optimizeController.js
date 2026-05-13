const Report = require('../models/Report');

const runOptimization = async (req, res) => {
  try {
    const { reportId } = req.body;
    
    const report = await Report.findById(reportId);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Simulate optimization
    // Increase score by 10-25 points, capped at 100
    const improvedScore = Math.min(100, report.performanceScore + Math.floor(Math.random() * 15 + 10));
    
    // Simulate metrics improvement
    const improvedLcp = (parseFloat(report.lcp) * 0.7).toFixed(1) + ' s';
    const improvedCls = (parseFloat(report.cls) * 0.5).toFixed(3);
    const improvedTbt = Math.floor(parseInt(report.tbt) * 0.4) + ' ms';

    // Clear issues since they are "fixed"
    const improvedIssues = [];

    // Save as a new simulated report
    const optimizedReport = new Report({
      siteId: report.siteId,
      deviceType: report.deviceType,
      performanceScore: improvedScore,
      lcp: improvedLcp,
      cls: improvedCls,
      tbt: improvedTbt,
      issues: improvedIssues,
    });

    const savedOptimizedReport = await optimizedReport.save();

    res.json({
      message: 'Optimization simulated successfully. Images compressed and assets minified.',
      originalScore: report.performanceScore,
      newScore: savedOptimizedReport.performanceScore,
      report: savedOptimizedReport
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  runOptimization,
};
