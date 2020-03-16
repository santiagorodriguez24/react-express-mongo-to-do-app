'use strict'
const Todo = require('../models/todoModel');
const fs = require('fs'); // paquete de node
const path = require('path'); // paquete de node

exports.getTodos = function (req, res) {

    let { id, tituloQuery, descripcionQuery, estado } = req.query;

    let query = {};

    if (id) {
        query._id = id;
    }

    if (tituloQuery) {
        query.titulo = `/${tituloQuery}/i`;
    }

    if (descripcionQuery) {
        query.descripcion = `/${descripcionQuery}/i`;
    }

    if (estado) {
        query.estado = estado;
    }

    // en el find se puede especificar una condicion de busqueda o filtro, si no se especifica ({}) trae todos los registros
    Todo.find(query)
        .exec((error, todos) => {
            if (error) {
                // si hay error se envia un codigo de respuesta 400 de bad reques y el error recibido 
                // el return hace que salga de la arrow function y no se ejecuta la siguiente instruccion
                return res.status(400).json({
                    ok: false,
                    error
                });
            }

            // Si llego aca preparo la respuesta para devolver
            res.json({
                ok: true,
                todos: todos
            });

        }
        );
}

exports.createTodo = function (req, res) {
    // gracias a bodyParser podemos recoger los parametros de la peticion  POST en req.body
    let body = req.body;

    console.log('Req body: ', body);
    console.log('Req files: ', req.files);

    // si no se recibe un archivo o el objeto recibido esta vacio
    if (!req.files || Object.keys(req.files).length === 0) {

        let todo = new Todo({
            body
        });

        todo.save((error, TodoDB) => {
            // si sucede un error recibo el error, si se guarda recibo el Todo creado con su id incluido.
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }

            //  envio el objeto usuario como respuesta, el estatus 200 esta implicito si no se especifica
            res.json({
                ok: true,
                todo: TodoDB
            });

        });
    }
    else {
        // Archivo es el nombre de la propiedad que tendra los archivos pasados en el body del request
        let archivo = req.files.archivo;
        let nombreSeparado = archivo.name.split('.'); // separo el string en un arreglo, tomando como separador el punto
        let extensionDelArchivo = nombreSeparado[nombreSeparado.length - 1]; // tomo lo que esta despues del ultimo punto

        // Extensiones permitidas
        let extensionesValidas = [
            'png', 'jpg', 'gif', 'jpeg', 'heic', 'tif', 'bmp',
            'txt', 'pdf', 'xls', 'xslx', 'doc', 'docx', 'ppt', 'pps'
        ];

        if (extensionesValidas.indexOf(extensionDelArchivo.toLowerCase()) < 0) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'El archivo no tiene una de las extensiones permitidas: ' + extensionesValidas.join(', '),
                    extension: extensionDelArchivo
                }
            });
        }

        let nombreSinEspacios = nombreSeparado[0].replace(/ /g, "");
        // Cambiar el nombre del archivo para que sea unico y evitar que se sobreescriba,
        // esto tmb previene que el cache del navegador al ver el mismo nombre piense que es la misma img aunque haya cambiado
        // para hacerlo unico se le agrega el numero de milisegundos de la fecha de subida (numero random del 000 al 999 )
        let nombreArchivo = `${nombreSinEspacios}-${new Date().getMilliseconds()}.${extensionDelArchivo}`;

        // mueve el archivo al directorio especificado
        archivo.mv(`uploads/${nombreArchivo}`, function (error) {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            body.archivo = `uploads/${nombreArchivo}`;

            // En este punto la imagen ya esta cargada en el servidor
            let todo = new Todo({
                body
            });

            todo.save((error, TodoDB) => {
                // si sucede un error recibo el error, si se guarda recibo el Todo creado con su id incluido.
                if (error) {
                    borrarArchivo(`uploads/${nombreArchivo}`);

                    return res.status(400).json({
                        ok: false,
                        error
                    });
                }

                //  envio el objeto usuario como respuesta, el estatus 200 esta implicito si no se especifica
                res.json({
                    ok: true,
                    todo: TodoDB
                });

            });
        }
        );
    }

}

exports.updateTodo = function (req, res) {
    // Los parametros se toman asi:
    let id = req.params.id;

    Todo.findById(id, (error, todoDB) => {

        if (error) {
            console.log('UPDATE Error al encontrar el todo');
            return res.status(400).json({
                ok: false,
                error
            });
        }

        todoDB.titulo = body.titulo;
        todoDB.descripcion = body.descripcion;
        todoDB.estado = body.estado;

        // En este punto el todo ya fue encontrado
        // si no se recibe un archivo o el objeto recibido esta vacio
        if (!req.files || Object.keys(req.files).length === 0) {

            // guardo los nuevos valores sin modificar el archivo guardado
            todoDB.save((error, TodoGuardado) => {
                // si sucede un error recibo el error, si se guarda recibo el Todo creado con su id incluido.
                if (error) {
                    console.log('UPDATE sin Archivos Error al Guardado');
                    return res.status(400).json({
                        ok: false,
                        error
                    });
                }

                console.log('UPDATE sin Archivos se guarda con exito')
                //  envio el objeto usuario como respuesta, el estatus 200 esta implicito si no se especifica
                res.json({
                    ok: true,
                    todo: TodoGuardado
                });

            }
            );
        }
        else {
            // Archivo es el nombre de la propiedad que tendra los archivos pasados en el body del request
            let archivo = req.files.archivo;
            let nombreSeparado = archivo.name.split('.'); // separo el string en un arreglo, tomando como separador el punto
            let extensionDelArchivo = nombreSeparado[nombreSeparado.length - 1]; // tomo lo que esta despues del ultimo punto

            // Extensiones permitidas
            let extensionesValidas = [
                'png', 'jpg', 'gif', 'jpeg', 'heic', 'tif', 'bmp',
                'txt', 'pdf', 'xls', 'xslx', 'doc', 'docx', 'ppt', 'pps'
            ];

            if (extensionesValidas.indexOf(extensionDelArchivo.toLowerCase()) < 0) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'El archivo no tiene una de las extensiones permitidas: ' + extensionesValidas.join(', '),
                        extension: extensionDelArchivo
                    }
                });
            }

            let nombreSinEspacios = nombreSeparado[0].replace(/ /g, "");
            // Cambiar el nombre del archivo para que sea unico y evitar que se sobreescriba,
            // esto tmb previene que el cache del navegador al ver el mismo nombre piense que es la misma img aunque haya cambiado
            // para hacerlo unico se le agrega el numero de milisegundos de la fecha de subida (numero random del 000 al 999 )
            let nombreArchivo = `${nombreSinEspacios}-${new Date().getMilliseconds()}.${extensionDelArchivo}`;

            // mueve el archivo al directorio especificado
            archivo.mv(`uploads/${nombreArchivo}`, function (error) {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        error
                    });
                }

                // borro el archivo anterior antes de guardar el nuevo
                borrarArchivo(todoDB.archivo);

                todoDB.archivo = `uploads/${nombreArchivo}`;

                // guardo los nuevos valores
                todoDB.save((error, TodoGuardado) => {
                    // si sucede un error recibo el error, si se guarda recibo el Todo creado con su id incluido.
                    if (error) {
                        console.log('UPDATE con Archivos Error al Guardado');

                        borrarArchivo(`uploads/${nombreArchivo}`);

                        return res.status(400).json({
                            ok: false,
                            error
                        });
                    }

                    console.log('UPDATE con Archivos se guarda con exito')
                    //  envio el objeto usuario como respuesta, el estatus 200 esta implicito si no se especifica
                    res.json({
                        ok: true,
                        todo: TodoGuardado
                    });

                }
                );

            }
            );
        }

    }
    );

}

exports.deleteTodo = function (req, res) {
    let id = req.params.id;

    // eliminacion fisica, registro deja de existir en la base de datos.
    Todo.findByIdAndRemove(id, (error, todoBorrado) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        // Si encuentra el Todo borra el registro y lo devuelve como segundo parametro de esta funcion callback
        if (todoBorrado) {
            // si se borra 
            res.json({
                ok: true,
                todo: todoBorrado
            });
        }
        else {
            // si no encuentra el Todo no da error pero usuarioBorrado = null
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'To Do no encontrado'
                }
            });
        }

    });

}

exports.getFile = (req, res) => {
    let { nombreArchivo } = req.params;

    // armo el path con la referencia de imagen que estaba guardada en el usuario
    let pathImagen = path.resolve(__dirname, `../uploads/${nombreArchivo}`);

    // me fijo si existe un archivo con el mismo nombre y en la misma carpeta
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        // empiezo en el directorio donde esta este archivo
        let noImagePath = path.resolve(__dirname, '../assets/no-file.jpg');

        // lee el content type del archivo y regresa eso, si es una imagen una imagen si es json un json,
        res.sendFile(noImagePath);
    }

}

function borrarArchivo(rutaArchivo) {
    // armo el path con la referencia de imagen que estaba guardada en el usuario
    let pathImagen = path.resolve(__dirname, `../${rutaArchivo}`);
    // me fijo si existe un archivo con el mismo nombre y en la misma carpeta
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen); // si existe el archivo lo borro antes de guardar el nuevo
    }
}