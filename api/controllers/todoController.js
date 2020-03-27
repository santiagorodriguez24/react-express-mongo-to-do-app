'use strict'
const Todo = require('../models/todoModel');
const fs = require('fs');
const path = require('path');
const uploadsFolderPath = process.env.URLFILES;

exports.getTodos = function (req, res) {

    let { id, title, description, state } = req.query;

    let query = {};

    if (id) {
        query.id = id;
    }

    if (title) {
        query.title = { "$regex": title, "$options": "i" };
    }

    if (description) {
        query.description = { "$regex": description, "$options": "i" };;
    }

    if (state) {
        query.state = state;
    }

    Todo.find(query)
        .sort('id')
        .exec((error, todos) => {

            if (error) {
                console.log(`Data search failed. Error: ${error}`);

                return res.status(400).json({
                    ok: false,
                    error: "Data search failed."
                });
            }

            return res.json({
                ok: true,
                todos: todos
            });

        }
        );
}

exports.getTodoById = function (req, res) {

    let { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({
            ok: false,
            error: 'The task that id wasn\'t found.'
        });
    }

    Todo.findOne({ id: id }, (error, todoDB) => {

        if (error) {
            console.log(`The task wasn't found. ${error}`);

            return res.status(400).json({
                ok: false,
                error: 'The task that id wasn\'t found.'
            });
        }

        return res.json({
            ok: true,
            todo: todoDB
        });
    }
    )

}

exports.createTodo = function (req, res) {
    let body = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {

        let todo = new Todo(body);

        todo.save((error, TodoDB) => {

            if (error) {
                console.log(`Failed to save to-do. Error: ${error}`);

                return res.status(500).json({
                    ok: false,
                    error: "Failed to save to-do."
                });
            }

            res.location('/todos/' + TodoDB.id);
            return res.status(201).json({
                ok: true,
                todo: TodoDB
            });

        });
    }
    else {
        let file = req.files.file;
        let dividedName = file.name.split('.');
        let fileExtension = dividedName[dividedName.length - 1];

        let validExtensions = [
            'png', 'jpg', 'gif', 'jpeg', 'heic', 'tif', 'bmp',
            'txt', 'pdf', 'xls', 'xslx', 'doc', 'docx', 'ppt', 'pps'
        ];

        if (validExtensions.indexOf(fileExtension.toLowerCase()) < 0) {

            return res.status(400).json({
                ok: false,
                error: 'The attached file does not have a valid extension. Valid extensions are: ' + validExtensions.join(', ') + '.'
            });
        }

        let formattedName = dividedName[0].replace(/ /g, "");

        // prevents a file from being overwritten if it has the same name as the received file.
        let fileName = `${formattedName}-${new Date().getMilliseconds()}.${fileExtension}`;

        file.mv(`${path.resolve(__dirname, `../${uploadsFolderPath}`)}/${fileName}`, function (error) {
            if (error) {
                console.log(`Failed to save the attached file. Error: ${error}`);

                return res.status(500).json({
                    ok: false,
                    error: 'Failed to save the attached file.'
                });
            }

            body.file = `${uploadsFolderPath}/${fileName}`;

            let todo = new Todo(body);

            todo.save((error, TodoDB) => {

                if (error) {
                    console.log(`Failed to save to-do. Error: ${error}`);

                    deleteFile(`${uploadsFolderPath}/${fileName}`);

                    return res.status(500).json({
                        ok: false,
                        error: 'Failed to save to-do.'
                    });
                }

                res.location('/todos/' + TodoDB.id);
                return res.status(201).json({
                    ok: true,
                    todo: TodoDB
                });

            });
        }
        );
    }

}

exports.updateTodo = function (req, res) {

    let id = req.params.id;
    let body = req.body;

    Todo.findOne({ id: id }, (error, todoDB) => {

        if (error) {
            console.log(`The task to update wasn't found. ${error}`);

            return res.status(400).json({
                ok: false,
                error: 'The task to update was not found.'
            });
        }

        Object.assign(todoDB, body);

        if (!req.files || Object.keys(req.files).length === 0) {

            todoDB.save((error, SavedTodo) => {

                if (error) {
                    console.log(`Failed to update task. Error: ${error}`);

                    return res.status(500).json({
                        ok: false,
                        error: 'Failed to update task.'
                    });
                }

                return res.json({
                    ok: true,
                    todo: SavedTodo
                });

            }
            );
        }
        else {
            let file = req.files.file;
            let dividedName = file.name.split('.');
            let fileExtension = dividedName[dividedName.length - 1];

            let validExtensions = [
                'png', 'jpg', 'gif', 'jpeg', 'heic', 'tif', 'bmp',
                'txt', 'pdf', 'xls', 'xslx', 'doc', 'docx', 'ppt', 'pps'
            ];

            if (validExtensions.indexOf(fileExtension.toLowerCase()) < 0) {
                return res.status(400).json({
                    ok: false,
                    error: 'The attached file does not have a valid extension. Valid extensions are: ' + validExtensions.join(', ') + '.'
                });
            }

            let formattedName = dividedName[0].replace(/ /g, "");
            let fileName = `${formattedName}-${new Date().getMilliseconds()}.${fileExtension}`;

            file.mv(`${path.resolve(__dirname, `../${uploadsFolderPath}`)}/${fileName}`, function (error) {
                if (error) {
                    console.log(`Failed to save the attached file. Error: ${error}`);

                    return res.status(500).json({
                        ok: false,
                        error: 'Failed to save the attached file.'
                    });
                }

                // The old file is deleted before saving the new one.
                deleteFile(todoDB.file);

                todoDB.file = `${uploadsFolderPath}/${fileName}`;

                todoDB.save((error, SavedTodo) => {

                    if (error) {
                        console.log(`Failed to update task. Error: ${error}`);

                        deleteFile(`${uploadsFolderPath}/${fileName}`);

                        return res.status(500).json({
                            ok: false,
                            error: 'Failed to update task.'
                        });
                    }

                    return res.json({
                        ok: true,
                        todo: SavedTodo
                    });

                });

            });

        }

    });

}

exports.deleteTodo = function (req, res) {
    let id = req.params.id;

    Todo.findOneAndDelete({ id: id }, (error, deletedTodo) => {

        if (error) {
            console.log(`Failed to delete task. Error: ${error}`);

            return res.status(500).json({
                ok: false,
                error: 'Failed to delete task.'
            });
        }

        // If the record is not found, it doesn't give an error but deletedTodo = null.
        if (deletedTodo) {

            if (deletedTodo.file) {
                deleteFile(deletedTodo.file);
            }

            return res.json({
                ok: true,
                todo: deletedTodo
            });
        }
        else {
            return res.status(400).json({
                ok: false,
                error: 'Task not found'
            });
        }

    });

}

exports.getFile = (req, res) => {
    let { fileName } = req.params;

    let pathFile = path.resolve(__dirname, `../${uploadsFolderPath}/${fileName}`);

    if (fs.existsSync(pathFile)) {
        return res.sendFile(pathFile);
    }
    else {
        let noFilePath = path.resolve(__dirname, `../${uploadsFolderPath}/no-file.jpg`);
        return res.sendFile(noFilePath);
    }

}

function deleteFile(filePath) {
    let pathFile = path.resolve(__dirname, `../${filePath}`);

    if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile);
    }
}