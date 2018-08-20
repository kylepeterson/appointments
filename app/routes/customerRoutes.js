const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
  app.get('/customers', (req, res) => {
    db.collection('customers').find(req.query).toArray()
        .then(items => res.send(items))
        .catch(err => res.send(err))
  });

  app.get('/customers/:id', (req, res) => {
    const details = { '_id': new ObjectID(req.params.id) };
    db.collection('customers').findOne(details, (err, item) => {
      if (err) {
        res.send(err);
      } else {
        res.send(item);
      }
    });
  });

  // app.delete('/customers/:id', (req, res) => {
  //   const id = req.params.id;
  //   const details = { '_id': new ObjectID(id) };
  //   db.collection('customers').removeOne(details, (err, item) => {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.send('Customer ' + id + ' deleted!');
  //     }
  //   });
  // });

  app.put('/customers/:id', (req, res) => {
    const details = { '_id': new ObjectID(req.params.id) };
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    db.collection('customers').updateOne(details, customer, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(customer);
      }
    });
  });

  app.post('/customers', (req, res) => {
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    db.collection('customers').insertOne(customer, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
