'use strict';
module.exports = function (app) {
  const UserController = require('./controllers');
  let passport = require('passport');
  let LocalStrategy = require('passport-local').Strategy;

  app.route('/api/users')
    .get((req, res) => {
      UserController.getAll().then((listUsers) => {
        res.json(listUsers);
      });
    });

  app.route('/api/users/signUp')
    .post((req, res) => {
      UserController.create(
        req.body.name,
        req.body.userName,
        req.body.type,
        req.body.password,
        req.body.email
      ).then((objUser) => {
        res.json(objUser);
      })
    })

  app.route('/api/users/:id')
    .get((req, res) => {
      UserController.getById(req.params.id).then((objUser) => {
        res.json(objUser)
      });
    })
    .put((req, res) => {
      UserController.updateById(
        req.params.id,
        req.body.name,
        req.body.userName,
        req.body.type,
        req.body.password,
        req.body.email
      ).then((objUser) => {
        res.json(objUser);
      })
    })
    .delete((req, res) => {
      UserController.deleteById(req.params.id).then((strMessage) => {
        res.json(strMessage);
      });
    })

  app.post('/login', 
  passport.authenticate('local'
  , {
    failureRedirect: 'C:/Users/Temistocles/Desktop/web/ProyectoWeb1/login.html',
    successRedirect: 'C:/Users/Temistocles/Desktop/web/ProyectoWeb1/homeAdmin.html',
  }), function(req, res) {
    res.send('Welcome back');
  })
};