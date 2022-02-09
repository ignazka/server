const ROUTES = require('./auth.constants');
const controller = require('./auth.controllers');
const router = require('express').Router();

function authRouter(app) {
  router
    .post(ROUTES.signup, controller.signup)
    .post(ROUTES.login, controller.login)
    .post(ROUTES.logout, controller.logout)
    .get(ROUTES.isLoggedIn, controller.isLoggedIn)
    .get(ROUTES.getUsers, controller.getAllUsers)
    .delete(ROUTES.deleteUser, controller.deleteUser);

  app.use('/api', router);
}

module.exports = authRouter;
