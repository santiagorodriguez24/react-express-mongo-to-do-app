process.env.PORT = process.env.PORT || 3002;

process.env.NODE_ENV = process.env.NODE_ENV || 'desarrollo';

let urlDB;

if (process.env.NODE_ENV === 'desarrollo') {
    urlDB = 'mongodb://localhost:27017/to-do-app';
} else {
    urlDB = process.env.mongo_database_url
}

process.env.URLDB = urlDB;