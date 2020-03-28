# To-Do App :white_check_mark:

[![code style](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Work and workflow visualization tool that enable to manage work at personal or organizational level, limit work-in-progress, and maximize efficiency.

This application made with [React.js][] and [Express.js][] is designed to work with [mongoDB](https://www.mongodb.com/) databases.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Config](#config)
- [Usage](#usage)
  - [Run a local server](#run-a-local-server)
  - [Run on development mode](#run-on-development-mode)
  - [Testing](#testing)
- [Deploy to heroku](#deploy-to-heroku)

## Features

- Create, list, delete and update tasks and their status.
- Update the status of a task by grabbing and dropping it on the desired column.
- Attach files to tasks.
- Filter the task list by different fields.
- Responsive design.

## Installation

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Clone the repository:

```bash
git clone https://github.com/santiagorodriguez24/to-do-app.git
```

Install dependencies:

```sh
npm install
```

## Config

Put your database values into the `config.js` file found in the `api/config/` sub-directory.

**config.js:**

```js
process.env.PORT = process.env.PORT || 5000;

process.env.NODE_ENV = process.env.NODE_ENV || "development";

let urlDB;
let urlFILES;

if (process.env.NODE_ENV === "development") {
  urlDB = "mongodb://localhost:27017/to-do-app"; // Edit with your database url.
  urlFILES = "uploads";
} else if (process.env.NODE_ENV === "test") {
  urlDB = "mongodb://localhost:27017/to-do-app-test"; // Edit with your test database url.
  urlFILES = "test/uploads";
} else {
  urlDB = process.env.mongo_database_url;
  urlFILES = "uploads";
}

process.env.URLDB = urlDB;
process.env.URLFILES = urlFILES;
```

## Usage

### Run a local server

The built version of the react client is served from the express server.

On root directory

```bash
npm run local-start
```

### Run on development mode

The client runs on a webpack server and makes requests to the local server through a proxy.

On root directory

```bash
npm run dev-start
```

### Testing

The React.js front-end is testing using [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/).
The Node.js back-end is tested using [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) and [Supertest](https://github.com/visionmedia/supertest).
The following commands must be run in the root directory of the project.

Run front-end test:

```bash
npm run test-client
```

Run back-end test:

```bash
npm run test-server
```

Run both:

```bash
npm test
```


## Deploy to heroku

Before deploy:

- Create a [MongoDB Atlas](https://www.mongodb.com/) account.
- Build a cluster.
- Create a database in the cluster.
- Create a user for the database.

```bash
git clone https://github.com/santiagorodriguez24/to-do-app.git
cd to-do-app/
heroku create
git push heroku master
heroku config:set mongo_database_url="mongodb+srv://<username>:<password>@cluster0-xp3lv.mongodb.net/collectionname"
```

This deployment will:

- Detect [Node buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
- Build the app with
  - `npm install` for the Node server.
  - `npm install` && `npm run build` for the React Client
- Connect to the cloud database.

:warning: Attaching files does not work as expected in heroku. The Heroku filesystem is ephemeral - that means that any changes to the file system while they dyno is running only last until that dyno is shutdown or restart. [More info](https://help.heroku.com/K1PPS2WM/why-are-my-file-uploads-missing-deleted).

Working example: https://sr-to-do.herokuapp.com/

## Versions

- [1.0.0](https://github.com/santiagorodriguez24/to-do-app/releases/tag/v1.0.0):
  - First functional version of the application.

##

[npm]: https://www.npmjs.com/
[react.js]: https://reactjs.org/
[express.js]: https://expressjs.com/
