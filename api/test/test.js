process.env.NODE_ENV = "test";
process.env.PORT = 5001;

const assertChai = require('chai').assert;
var request = require('supertest');
const path = require('path');
var api = require('../index');

const port = process.env.PORT;
request = request(`http://localhost:${port}`);

describe('API, To Do', function () {

    let testId;
    let todosDB = [];

    before(async function () {
        try {
            let response = await request.get('/todos');
            let todos = response.body.todos;

            if (todos.length > 0) {
                testId = todos[todos.length - 1].id;
                todosDB = todos;
            } else {
                testId = false;
            }
        } catch (err) {
            testId = false;
        }
    });

    it('GET To-Dos List.', function (done) {
        request
            .get('/todos')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('content-type', /json/)
            .expect(function (response) {

                const { body } = response;

                assertChai.hasAllKeys(body, ['ok', 'todos'], 'Response shape is ok.');
                assertChai.doesNotHaveAnyKeys(body, 'error', 'No error.');
                assertChai.isOk(body.ok, 'Response ok value is true.');
                assertChai.isArray(body.todos, 'The todos property of the response is an array.');
            })
            .end(function (err, response) {
                if (err) return done(err);
                done();
            });
    });

    it('GET To-Do By id.', function (done) {
        if (!testId) {
            return this.skip();
        }

        request
            .get(`/todos/${testId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('content-type', /json/)
            .expect(function (response) {

                const { body } = response;

                assertChai.hasAllKeys(body, ['ok', 'todo'], 'Response shape is ok.');
                assertChai.doesNotHaveAnyKeys(body, 'error', 'No error.');
                assertChai.isOk(body.ok, 'Response ok value is true.');
                assertChai.deepEqual(body.todo, todosDB[todosDB.length - 1], 'The task received is as expected.');
            })
            .end(function (err, response) {
                if (err) return done(err);
                done();
            });
    });

    it('GET file.', function (done) {
        if (!testId) {
            return this.skip();
        }

        const filePath = todosDB[todosDB.length - 1].file;
        const requestPath = filePath.replace('test', '')

        request
            .get(requestPath)
            .expect(200)
            .expect('accept-ranges', 'bytes')
            .expect(function (response) {
                assertChai.notEqual(response.type, 'application/json', 'Response Type is not a Json Object.');
            })
            .end(function (err, response) {
                if (err) return done(err);
                done();
            });
    });

    it('POST /todo should response with status code 201, location header and the created todo.', function (done) {

        const todo = {
            title: 'Todo test Title 2',
            description: 'Todo test description 2',
            state: 'PENDING'
        }

        request
            .post('/todos')
            .field("title", todo.title)
            .field("description", todo.description)
            .field("state", todo.state)
            .attach("file", path.resolve(__dirname, './uploads/no-file.jpg'))
            .expect(201)
            .expect('content-type', /json/)
            .expect('location', /todos/)
            .expect(function (response) {

                const { body } = response;

                assertChai.notExists(body.error, 'Response doesn\'t have an error.');
                assertChai.isOk(body.ok, 'Response ok value is true.')

                assertChai.typeOf(body.todo.id, 'number', 'Created todo id is a number.');
                assertChai.typeOf(body.todo._id, 'string', 'Created todo _id is a string.');
                assertChai.strictEqual(body.todo.title, todo.title, 'Title value of the created task matches the title value sent in the request.');
                assertChai.strictEqual(body.todo.description, todo.description, 'Description value of the created task matches the description value sent in the request.');
                assertChai.strictEqual(body.todo.state, todo.state, 'State value of the created task matches the state value sent in the request.');

            })
            .end(function (err, response) {
                if (err) return done(err);
                done();
            });
    });

    it('PUT /todo should response with status code 200 and updated todo.', function (done) {

        if (!testId) {
            return this.skip();
        }

        const todo = {
            title: 'Todo test Title edited',
            description: 'Todo test description edited',
            state: 'IN PROGRESS'
        }

        request
            .put(`/todos/${testId}`)
            .field("title", todo.title)
            .field("description", todo.description)
            .field("state", todo.state)
            .attach("file", path.resolve(__dirname, './uploads/no-file.jpg'))
            .expect(200)
            .expect('content-type', /json/)
            .expect(function (response) {

                const { body } = response;

                assertChai.notExists(body.error, 'Response doesn\'t have an error.');
                assertChai.isOk(body.ok, 'Response ok value is true.')

                assertChai.typeOf(body.todo.id, 'number', 'Updated todo id is a number.');
                assertChai.typeOf(body.todo._id, 'string', 'Updated todo _id is a string.');
                assertChai.strictEqual(body.todo.title, todo.title, 'Title value of the updated task matches the title value sent in the request.');
                assertChai.strictEqual(body.todo.description, todo.description, 'Description value of the updated task matches the description value sent in the request.');
                assertChai.strictEqual(body.todo.state, todo.state, 'State value of the updated task matches the state value sent in the request.');
                assertChai.include(body.todo.file, 'no-file', 'Check File Name.');

            })
            .end(function (err, response) {
                if (err) return done(err);
                done();
            });

    });

    it('DELETE /todo should response with status code 200 and deleted todo.', function (done) {
        if (!testId) {
            return this.skip();
        }

        request
            .del(`/todos/${testId}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('content-type', /json/)
            .expect(function (response) {

                const { body } = response;

                assertChai.hasAllKeys(body, ['ok', 'todo'], 'Response shape is ok.');
                assertChai.doesNotHaveAnyKeys(body, 'error', 'No error.');
                assertChai.isOk(body.ok, 'Response ok value is true.');
                assertChai.equal(body.todo.id, testId, 'The task to be deleted has been deleted.');
            })
            .end(function (err, response) {
                if (err) return done(err);
                done();
            });
    });

    it('GET request on non-existent return index.html.', function (done) {
        request
            .get('/hello')
            .expect(200)
            .expect('content-type', /html/)
            .expect(function (response) {
                assertChai.equal(response.type, 'text/html', 'Response type is text/html.');
                assertChai.include(response.text, 'to-do-icon.png', 'HTML requires to-do icon.');
            })
            .end(function (err, response) {
                if (err) return done(err);
                done();
            });
    });

    it('PUT request on non-existent route return 404 error with json data if Accept header is equal to application/json.', function (done) {
        request
            .put('/todos/100/noexist')
            .send({ title: 'error title' })
            .set('Accept', 'application/json')
            .expect(404)
            .expect('content-type', /json/)
            .expect(function (response) {

                const { body } = response;

                assertChai.hasAllKeys(body, ['ok', 'error'], 'Response shape is ok.');
                assertChai.isNotOk(body.ok, 'Response ok value is false.');
                assertChai.strictEqual(body.error, 'Not found.', 'Response error is Not found.');

            })
            .end(function (err, response) {
                if (err) return done(err);
                done();
            });
    });

});