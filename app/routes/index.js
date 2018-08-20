const appointmentRoutes = require('./appointmentRoutes');
const customerRoutes = require('./customerRoutes');
const resourceRoutes = require('./resourceRoutes');
const serviceRoutes = require('./serviceRoutes');

module.exports = function(app, db) {
  appointmentRoutes(app, db);
  customerRoutes(app, db);
  resourceRoutes(app, db);
  serviceRoutes(app,db);
};