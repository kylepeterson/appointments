const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.get('/appointments', (req, res) => {
    db.collection('appointments').find(req.query).toArray()
        .then(items => res.send(items))
        .catch(err => res.send(err))
  });

  app.get('/appointments/:id', (req, res) => {
    const details = { '_id': new ObjectID(req.params.id) };
    db.collection('appointments').findOne(details, (err, item) => {
      if (err) {
        res.send(err);
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/appointments/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('appointments').removeOne(details, (err, item) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Appointment ' + id + ' deleted!');
      }
    });
  });

  app.put('/appointments/:id', (req, res) => {
    const body = req.body;
    const startDate = body.startDate == null ? null : new Date(body.startDate);

    const appointment = {
      startDate: startDate,
      customer: body.customer,
      resource: body.resource,
      service: body.service,
    };

    db.collection('appointments').updateOne(details, appointment, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(appointment);
      }
    });
  });

  app.post('/appointments', (req, res) => {
    const body = req.body;
    const startDate = body.startDate == null ? null : new Date(body.startDate);

    const appointment = {
      startDate: startDate,
      customer: body.customer,
      resource: body.resource,
      service: body.service,
    };

    db.collection('appointments').insertOne(appointment, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
