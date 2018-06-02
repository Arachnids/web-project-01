'use strict';

module.exports = function (app) {
  const JobController = require('./controllers');

  app.route('/api/jobs')
    .get((req, res) => {
      JobController.getAll().then((listJobs) => {
        res.json(listJobs);
      });
    });

  app.route('/api/jobs/createJob')
    .post((req, res) => {
      console.log(req.file);
      JobController.create(
        req.body.company,
        req.body.type,
        req.body.position,
        req.body.location,
        req.body.category,
        req.body.description,
        req.body.applyGuide,
        req.body.email
      ).then((objJob) => {
        res.json(objJob);
      });
    });

  app.route('/api/jobs/:category')
    .get((req, res) => {
      JobController.getByCategory(req.params.category).then((listJobs) => {

        res.json(listJobs);
      });
    });

  app.route('/api/jobs/find/:id')
    .get((req, res) => {
      JobController.getById(req.params.id).then((objJob) => {
        res.json(objJob)
      });
    })
    .put((req, res) => {
      JobController.updateById(
        req.params.id,
        req.body.company,
        req.body.type,
        req.body.position,
        req.body.location,
        req.body.category,
        req.body.description,
        req.body.applyGuide,
        req.body.email
      ).then((objJob) => {
        res.json(objJob);
      })
    })
    .delete((req, res) => {
      JobController.deleteById(req.params.id).then((strMessage) => {
        res.json(strMessage);
      });
    });

  app.route('/api/jobs/:pageNumber/:nPerPage')
    .get((req, res) => {
      JobController.getByPage(req.params.pageNumber, req.params.nPerPage).then((listJobs) => {
        res.json(listJobs);
      });
    });
};