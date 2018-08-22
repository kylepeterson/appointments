const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  // GET /services
  app.get('/services', (req, res) => {
    db.collection('services').find(req.query).toArray()
        .then(items => res.send(items))
        .catch(err => res.send(err))
  });

  // GET /services/:id
  app.get('/services/:id', (req, res) => {
    const details = { '_id': new ObjectID(req.params.id) };
    db.collection('services').findOne(details, (err, item) => {
      if (err) {
        res.send(err);
      } else {
        res.send(item);
      }
    });
  });

  // PUT /services/:id
  app.put('/services/:id', (req, res) => {
    const details = { '_id': new ObjectID(req.params.id) };
    const service = {
      name: req.body.name,
      length: req.body.length,
    };
    db.collection('services').updateOne(details, service, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(service);
      }
    });
  });

  // POST /services
  app.post('/services', (req, res) => {
    const service = {
      name: req.body.name,
      length: req.body.length,
    };
    db.collection('services').insertOne(service, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
