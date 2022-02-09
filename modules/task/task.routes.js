const ROUTES = require('./task.constants');
const controllers = require('./task.controllers');
const router = require('express').Router();

function taskRouter(app) {
  router
    .post(ROUTES.createTask, controllers.createTask)
    .get(ROUTES.getTasks, controllers.getTasks)
    .get(ROUTES.getTask, controllers.getTaskByID)
    .put(ROUTES.updateTask, controllers.updateTask)
    .delete(ROUTES.deleteTask, controllers.deleteTask);

  app.use('/api/tasks', router);
}

module.exports = taskRouter;
