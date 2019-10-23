'use strict'

const mongoose = require('mongoose');
const Task = require('../models/Task')

exports.plugin = {
    register: (server, options) => {
        server.route({
            method: 'GET',
            path: '/tasks',
            handler: (req, h) => {
                return Task.find((err, res) => {
                    if (err) {
                        return err
                    }
                    return res;
                });
            }
        });
        server.route({
            method: 'GET',
            path: '/task/{id}',
            handler: (req, h) => {
                return Task.FindOne({
                        _id: mongoose.Types.ObjectId(req.params.id)
                    },
                    (err, doc) => {
                        if (err) {
                            return err, 'Internal MongoDB error'
                        }
                        if (!doc) {
                            return 'Not Found';
                        }
                        return doc;
                    });
            }
        });
        server.route({
            method: 'POST',
            path: '/task',
            handler: (req, h) => {
                var task = new Task()
                task.task_name = req.payload.task_name;
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
            path: '/task/{id}',
            handler: (req, h) => {
                return Task.findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        task_name: req.payload.task_name
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
                    });
            }
        });
        server.route({
            method: 'DELETE',
            path: '/task/{id}',
            handler: (req, h) => {

                return Task.deleteOne({
                    _id: req.params.id

                }, (err, res) => {
                    if (err) {
                        return err, 'Internal Mongodb Error';
                    }
                    if (res.n === 0) {
                        return 'Not Found';
                    }
                    return 204;
                });

            }
        });

    },
    name: 'api'
};