'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Cat = require('../model/cat');

module.exports = exports = {};

exports.createItem = function(item) {
  return new Cat(item).save();
};

exports.fetchItem = function(id){
  return Cat.findById(id)
  .catch(err => Promise.reject(createError, 404, err.message));
};

exports.deleteItem = function(id) {
  return Cat.findByIdAndRemove(id)
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.updateItem = function(id, item) {
  // if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!item) return Promise.reject(createError(400, 'name and mood required'));

  return Cat.findByIdAndUpdate(id, {name: item.name, mood: item.mood}, {new: true})
  .catch(err => Promise.reject(createError(404, err.message)));
};
