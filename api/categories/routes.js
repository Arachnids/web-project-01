'use strict';
module.exports = function (app) {
  const CategoryController = require('./controllers');

  app.route('/api/categories')
    .get((req, res) => {
      CategoryController.getAll().then((listCategories) => {
        res.json(listCategories);
      });
    });
  
  app.route('/api/categories/:id')
    .get((req, res) => {
      CategoryController.getById(req.params.id).then((objCategory) => {
        res.json(objCategory)
      });
    })
    .delete((req, res) => {
      CategoryController.deleteById(req.params.id).then((strMessage) => {
        res.json(strMessage);
      });
    })

  app.route('/api/categories/createCategory')
    .post((req,res) => {
      CategoryController.create(
        req.body.name
      ).then((objCategory) => {
        res.json(objCategory);
      });
    });

};