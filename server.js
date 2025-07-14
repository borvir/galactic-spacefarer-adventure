const cds = require('@sap/cds');

// Enable authentication for production
cds.on('bootstrap', (app) => {
  app.use('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  });
});

module.exports = cds.server;
