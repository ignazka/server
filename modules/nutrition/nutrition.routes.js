const controllers = require('./nutrition.controllers');
const router = require('express').Router();

function nutritionRouter(app) {
  router.post('/', controllers.createFood).delete('/', controllers.deleteFood);

  app.use('/api/nutrition', router);
}

module.exports = nutritionRouter;
