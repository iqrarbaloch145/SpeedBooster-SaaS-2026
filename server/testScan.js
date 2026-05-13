const { runLighthouseScan } = require('./services/lighthouseService');

(async () => {
  console.log('Starting scan...');
  const res = await runLighthouseScan('https://example.com');
  console.log('Result:', res);
  process.exit(0);
})();
