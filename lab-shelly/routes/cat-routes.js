'use strict';

const catController = require('../controller/cat-controller');
const Cat = require('../model/cat');
// const createError = require('http-errors');

module.exports = function(router) {

  router.get('/api/cat/id', (req, res) => {
    if(req.params.id) {
      catController.fetchItem(req.params.id)
      .then(cat => {
        console.log(cat);
        res.json(cat);
      })
      // .catch(err => res.status(404).send(err.message);
      .catch(err => err);
    }
  });

  router.post('/api/cat', (req, res) => {
    catController.createItem(req.body)
    .then(cat => {
      res.json(cat);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.put('/api/cat/:id', function (req, res) {
    if(req.params.id) {
      catController.updateItem(req.params.id, req.body)
      .then(cat => {
        console.log('updated cat:', cat);
        res.json(cat);
      })
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.delete('/api/cat/:id', function (req, res) {
    // if(!req.params.id) {
    //   return res.error(400).send(createError(400,'id required'));
    // }
    if(req.params.id) {
      catController.deleteItem(req.params.id)
      .then(cat => {
        console.log('deleted item:', cat);
        res.json(cat);
      })
      .catch(err => res.status(404).send(err.message));
    }
  });
};


  // router.get('/api/cat/:id', function(req, res) {
  //   if(!req.params.id) {
  //     return res.error(400).send(createError(400,'id required'));
  //   }
  //   Cat.findById(req.params.id)
  //   .then(cat => {
  //     console.log(cat);
  //     res.json(cat);
  //   })
  //   .catch(err => res.status(404).send(err.message));
  // });
  // router.post('/api/cat', (req, res) => {
  //   new Cat(req.body).save()
  //   .then(cat => {
  //     res.json(cat);
  //   })
  //   .catch(err => res.status(404).send(err.message));
  // });
