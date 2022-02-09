const Task = require('./task.model');
const mongoose = require('mongoose');

const isObjectID = id => mongoose.Types.ObjectId.isValid(id);

async function createTask(req, res) {
  try {
    const task = await Task.create(req.body);
    return res.status(200).json(task).end();
  } catch (error) {
    return res.status(500).json({ message: error.message }).end();
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.find().lean();
    return res.status(200).json(tasks).end();
  } catch (error) {
    return res.status(500).json({ message: error.message }).end();
  }
}

async function getTaskByID(req, res) {
  try {
    const { taskID } = req.params;
    if (!isObjectID) {
      return res.status(400).json({ message: 'ID is invalid' }).end();
    }
    const task = await Task.findById(taskID).lean();
    return res.status(200).json(task).end();
  } catch (error) {
    return res.status(500).json({ message: error.message }).end();
  }
}

async function updateTask(req, res) {
  try {
    const { taskID } = req.params;
    if (!isObjectID) {
      return res.status(400).json({ message: 'ID is invalid' }).end();
    }
    const task = await Task.findByIdAndUpdate(taskID, req.body, {
      new: true,
    }).lean();
    return res.status(200).json(task).end();
  } catch (error) {
    return res.status(500).json({ message: error.message }).end();
  }
}

async function deleteTask(req, res) {
  try {
    const { taskID } = req.params;
    if (!isObjectID) {
      return res.status(400).json({ message: 'ID is invalid' }).end();
    }
    const task = await Task.findByIdAndDelete(taskID).lean();
    return res.status(200).json(task).end();
  } catch (error) {
    return res.status(500).json({ message: error.message }).end();
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskByID,
  updateTask,
  deleteTask,
};
