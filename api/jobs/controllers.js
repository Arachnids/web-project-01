'use strict';
require('./model');
const mongoose = require('mongoose');
let Jobs = mongoose.model('jobs');

function getAll() {
  return new Promise((fnResolve, fnReject) => {
    Jobs.find({}, (objError, listJobs) => {
      if (objError) {
        return fnReject(objError);
      }

      return fnResolve(listJobs);
    });
  });
};

exports.getAll = getAll;

function getById(id) {
  return new Promise((fnResolve, fnReject) => {
    Jobs.findById(id, function (objError, objUser) {
      if (objError)
        return fnReject(objError);
      return fnResolve(objUser);
    });
  });
};

exports.getById = getById;

function create(company, type, position, location, category, description, applyGuide, email) {
  return new Promise((fnResolve, fnReject) => {
    console.log("Creating job post...");
    const ObjectJob = Object.assign({}, {
      company: company,
      type: type,
      position: position,
      location: location,
      category: category,
      description: description,
      applyGuide: applyGuide,
      email: email
    });
    const newJob = new Jobs(ObjectJob); //CREATING JOB IN DATABASE
    newJob.save(function (objError, objJob) {
      if (objError) {
        return fnReject(objError);
      }
      return fnResolve(objJob);
    });
  });
};

exports.create = create;

function deleteById(id) {
  return new Promise((fnResolve, fnReject) => {
    Jobs.remove({
      _id: id
    }, function (objError) {
      if (objError) {
        return fnReject(objError);
      }
      return fnResolve({ message: 'Job deleted.' });
    });
  });
};

exports.deleteById = deleteById;

function getByPage(pageNumber, nPerPage) {

  return new Promise((fnResolve, fnReject) => {
    Jobs.find()
      .skip((pageNumber - 1) * nPerPage)
      .limit(nPerPage * 1)
      .exec(function (objError, listJobs) {
        if (objError) {
          return fnReject(objError);
        }
        return fnResolve(listJobs);
      });
  });
};

exports.getByPage = getByPage;

function getByCategory(categoryName) {
  return new Promise((fnResolve, fnReject) => {
    Jobs.find({ category: categoryName }, (objError, listJobs) => {
      if (objError) {
        return fnReject(objError);
      }
      return fnResolve(listJobs);
    });
  });
};

exports.getByCategory = getByCategory;

function updateById(id, company, type, position, location, category, description, applyGuide, email) {
  return new Promise((fnResolve, fnReject) => {
    const objJob = Object.assign({}, {
      company: company,
      type: type,
      position: position,
      location: location,
      category: category,
      description: description,
      applyGuide: applyGuide,
      email: email
    });


    Jobs.findOneAndUpdate({ _id: id }, objJob, { new: true }, function (objError, objUser) {
      if (objError)
        return fnReject(objError);
      return fnResolve(objUser);
    });
  })
}

exports.updateById = updateById;