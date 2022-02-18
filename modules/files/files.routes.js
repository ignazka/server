const fileUploader = require('./../../config/files.config').single('imageUrl');
const controllers = require('./files.controllers');
const ROUTES = require('./files.constants');
const router = require('express').Router();

function filesRouter(app) {
  router.post(ROUTES.uploadImage, fileUploader, controllers.uploadImage);

  app.use('/api', router);
}

module.exports = filesRouter;
