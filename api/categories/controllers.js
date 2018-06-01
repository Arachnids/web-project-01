'use strict';
require('./model');
const mongoose = require('mongoose');
let Categories = mongoose.model('categories');

function getAll() {
  return new Promise((fnResolve, fnReject) => {
    Categories.find({}, (objError, listCategories) => {
      if (objError) {
        return fnReject(objError);
      }

      return fnResolve(listCategories);
    });
  });
};

exports.getAll = getAll;

function getById(id) {
  return new Promise((fnResolve, fnReject) => {
    Categories.findById(id, function (objError, objCategory) {
      if (objError)
        return fnReject(objError);
      return fnResolve(objCategory)
    });
  });
};

exports.getById = getById;

function create(name) {
  return new Promise((fnResolve, fnReject) => {
    console.log("Creating category...");
    const ObjectCategory = Object.assign({}, {
      name: name
    });
    const newCategory = new Categories(ObjectCategory);
    newCategory.save(function (objError, objCategory) {
      if (objError) {
        return fnReject(objError);
      }
      return fnResolve(objCategory);
    });
  });
};

exports.create = create;

