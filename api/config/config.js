// Aqui se declararan variables globales mediante el objeto process (hay otras formas)

// PUERTO:
// La variable existe cuando se ingresa a la app desplegada en Heroku. Pero NO cuando se ejecuta desde el entorno local se usa 
// el puerto 3000
process.env.PORT = process.env.PORT || 3002;

// ENTORNO:
// Para determinar si estoy en desarrollo o en produccion leo la variable process.env.NODE_ENV establecida por heroku:
process.env.NODE_ENV = process.env.NODE_ENV || 'desarrollo';

// BASE DE DATOS:
let urlDB;

if (process.env.NODE_ENV === 'desarrollo') {
    urlDB = 'mongodb://localhost:27017/to-do-app';
} else {
    /* 
    Se guarda la url de conexion a mongoDB Atlas en una variable de entorno de heroku
    para no exponer credenciales como usuario, password o puerto al subir el codigo a algun repositorio. 
    */
    urlDB = process.env.mongo_database_url
}

// Guardamos la url de la base de datos en una variable definida en el process por nosotros
process.env.URLDB = urlDB;