process.env.PORT = process.env.PORT || 5000;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let urlDB;
let urlFILES;

if (process.env.NODE_ENV === 'development') {
    urlDB = 'mongodb://localhost:27017/to-do-app';
    urlFILES = 'uploads';
} else if (process.env.NODE_ENV === 'test') {
    urlDB = 'mongodb://localhost:27017/to-do-app-test'
    urlFILES = 'test/uploads';
} else {
    urlDB = process.env.mongo_database_url
    urlFILES = process.env.upload_folder_url;
}

process.env.URLDB = urlDB;
process.env.URLFILES = urlFILES;