'use strict';
/* jshint node: true */

const mongoose = require('mongoose');
const Task = require('../models/Task');
const List = require('../models/List');

function createList(listName) {
  var list = new List();
  list.listName = listName;
  list.createdAt = Date.now();
  list.updatedAt = Date.now();
  list.isArchived = false;
  list.listIcon = 'none';
  return list;
}
function addTaskToList(taskPayload, listId) {
  var task = new Task();
  task.task_name = taskPayload.taskName;
  task.taskDeadline = taskPayload.taskDeadline ? taskPayload.taskDeadline : '';
  task.isCompleted = false;
  task.createdAt = Date.now();
  task.updatedAt = Date.now();
  task.listId = listId;
  return task;
}

exports.plugin = {
  register: (server, options) => {
    server.route({
      method: 'GET',
      path: '/tasks',
      handler: (req, h) => {
        return Task.find(
          { isCompleted: false, listId: { $exists: false } },
          (err, res) => {
            if (err) {
              return err;
            }
            return res;
          }
        ).sort({ updatedAt: -1 });
      }
    });
    server.route({
      method: 'GET',
      path: '/listCollection',
      handler: (req, h) => {
        return List.find((err, res) => {
          if (err) {
            return err;
          }
          return res;
        });
      }
    });
    server.route({
      method: 'POST',
      path: '/list',
      handler: (req, h) => {
        var list = createList(req.payload.listName);
        return list.save().then((err, res) => {
          if (err) {
            return err;
          }
          return res;
        });
      }
    });
    server.route({
      method: 'GET',
      path: '/list/{listId}/getTasks',
      handler: (req, h) => {
        return Task.find({
          listId: req.params.listId,
          isCompleted: false
        })
          .sort({ updatedAt: -1 })
          .then((err, res) => {
            if (err) return err;
            return res;
          });
      }
    });
    server.route({
      method: 'POST',
      path: '/list/{listId}/addTask',
      handler: (req, h) => {
        var newTask = addTaskToList(req.payload, req.params.listId);
        console.log(req.payload.taskDeadline, 'sent to the api');
        console.log(newTask.taskDeadline, 'savedInObject');
        return newTask.save().then((err, res) => {
          if (err) return err;
          return res;
        });
      }
    });

    server.route({
      method: 'GET',
      path: '/tasksHistory',
      handler: (req, h) => {
        return Task.find({ isCompleted: true }, (err, res) => {
          if (err) {
            return err;
          }
          return res;
        }).sort({ updatedAt: -1 });
      }
    });
    server.route({
      method: 'GET',
      path: '/task/{id}',
      handler: (req, h) => {
        return Task.FindOne(
          {
            _id: mongoose.Types.ObjectId(req.params.id)
          },
          (err, doc) => {
            if (err) {
              return err, 'Internal MongoDB error';
            }
            if (!doc) {
              return 'Not Found';
            }
            return doc;
          }
        );
      }
    });
    server.route({
      method: 'POST',
      path: '/task/general',
      handler: async (req, h) => {
        var task = new Task();
        task.taskDeadline = req.payload.taskDeadline
          ? req.payload.taskDeadline
          : '';

        task.task_name = req.payload.task_name;
        task.isCompleted = false;
        task.createdAt = Date.now();
        task.updatedAt = Date.now();
        return task.save().then((err, res) => {
          if (err) {
            return err;
          }
          return res;
        });
      }
    });
    server.route({
      method: 'PUT',
      path: '/task/{id}/complete',
      handler: (req, h) => {
        return Task.findOneAndUpdate(
          {
            _id: req.params.id
          },
          {
            updatedAt: Date.now(),
            isCompleted: true
          },
          (err, result) => {
            if (err) {
              return err, 'Internal Mongodb Error';
            }
            if (!result) {
              return 'Not Found';
            }
            // if (result.n === 0) {
            //     return 'Not Found';
            // }
            return 204;
          }
        );
      }
    });
    server.route({
      method: 'PUT',
      path: '/task/{id}',
      handler: (req, h) => {
        return Task.findOneAndUpdate(
          {
            _id: req.params.id
          },
          {
            task_name: req.payload.task_name,
            updatedAt: Date.now()
          },
          (err, result) => {
            if (err) {
              return err, 'Internal Mongodb Error';
            }
            if (!result) {
              return 'Not Found';
            }
            // if (result.n === 0) {
            //     return 'Not Found';
            // }
            return 204;
          }
        );
      }
    });
    server.route({
      method: 'DELETE',
      path: '/task/{id}',
      handler: (req, h) => {
        return Task.deleteOne(
          {
            _id: req.params.id
          },
          (err, res) => {
            if (err) {
              return err, 'Internal Mongodb Error';
            }
            if (res.n === 0) {
              return 'Not Found';
            }
            return 204;
          }
        );
      }
    });
  },
  name: 'api'
};
