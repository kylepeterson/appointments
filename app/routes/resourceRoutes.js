const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  // GET /resources
  app.get('/resources', (req, res) => {
    db.collection('resources').find(req.query).toArray()
        .then(items => res.send(items))
        .catch(err => res.send(err))
  });

  // GET /resource/:id
  app.get('/resources/:id', (req, res) => {
    const details = { '_id': new ObjectID(req.params.id) };
    db.collection('resources').findOne(details, (err, item) => {
      if (err) {
        res.send(err);
      } else {
        res.send(item);
      }
    });
  });

  // PUT /resource/:id
  app.put('/resources/:id', (req, res) => {
    const details = { '_id': new ObjectID(req.params.id) };
    const resource = {
      name: req.body.name,
    };
    db.collection('resources').updateOne(details, resource, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(resource);
      }
    });
  });

  // POST /resources
  app.post('/resources', (req, res) => {
    const resource = {
      name: req.body.name,
    };
    db.collection('resources').insertOne(resource, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
