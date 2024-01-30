const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const bcrypt = require('bcrypt')
const fileUpload = require('express-fileupload')
const jwt = require('jsonwebtoken')

const app = express()
const port = 5000
const saltRounds = 10
const myPlainTextPassword = 's0/\/\P4$$w0rD'

app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'desarrolloweb8a',
    password: ''
})

app.get('/', (req,res) =>{
    res.send('Hola mundo')
})

//------------CURRICULUMS----------------------------------------
//Post para la información del currículum
app.post('/curriculum/agregar', (req, res) =>{
    const { 
        nombre,
        apellido,
        nacimiento,
        email,
        celular,
        calle,
        colonia,
        cp,
        sexo,
        institucion,
        titulo,
        campo_estudio,
        graduacion,
        nombre_empresa,
        puesto,
        fecha_inicio,
        fecha_fin,
        descripcion,
        competencias,
        hobbies,
        certificaciones,
        valores,
        idiomas,
        facebook,
        instagram,
        twitter,
        linkedIn
    } = req.body
    const sql = 'INSERT INTO curriculum values(null, 1, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

    db.query(sql, [nombre, apellido, email, celular, calle, colonia, cp, sexo, institucion, titulo, campo_estudio, graduacion, nombre_empresa, puesto, fecha_inicio, fecha_fin, descripcion, competencias, hobbies, certificaciones, valores, idiomas, facebook, instagram, twitter, linkedIn
    ], (err, result) =>{
        if(err){
            res.send({
                status: 100,
                errNo: err.errno,
                mensaje: err.message,
                codigo: err.code
            })
        } else{
            res.send({
                status: 200
            })
        }
    })
})
//Cambiando el boolean del campo curriculum de la tabla profesores al crear o eliminar un curriculum
app.patch('/curriculum/profesor', (req, res) =>{
    const {clave, bool} = req.body
    const sql = 'UPDATE profesores set curriculum=? WHERE clave=?'
    db.query(sql, [bool, clave], (err, result) =>{
        if(err){
            res.send({
                status: 100,
                errNo: err.errno,
                mensaje: err.message,
                codigo: err.code
            })
        } else{
            res.send({
                status: 200
            })
        }

    })
})

//Eliminando el currículum
app.delete('/curriculum/eliminar/:id', (req, res) =>{
    const {id} = req.params
    const sql = 'DELETE FROM curriculum WHERE id=?'
    db.query(sql, [id], (err, result) =>{
        if(!err){
            res.send({
                status: 200,
                result,
            })
        }else{
                res.send({
                    status: 400,
                    result: {}
                })
            }
      })

})
//Obtener solo un currículum
app.get('/curriculum/ver/:id', (req,res) =>{
    const {id} = req.params
    const sql = 'SELECT * FROM curriculum WHERE id = ?'
    db.query(sql, [id], (err, result) =>{
        if(!err){
            res.send({
                status: 200,
                result,
            })
        }else{
                res.send({
                    status: 400,
                    result: {}
                })
            }
      })
})
app.get('/curriculum/ver', (req,res) =>{
    const sql = 'SELECT * FROM curriculum'
    db.query(sql, [], (err, result) =>{
        if(!err){
            res.send({
                status: 200,
                result,
            })
        }else{
                res.send({
                    status: 400,
                    result: {}
                })
            }
      })
})

//Actualizar la información del currículum
app.put('/curriculum/modificar/:id', (req, res) =>{
    const { 
        nombre,
        apellido,
        nacimiento,
        email,
        celular,
        calle,
        colonia,
        cp,
        sexo,
        institucion,
        titulo,
        campo_estudio,
        graduacion,
        nombre_empresa,
        puesto,
        fecha_inicio,
        fecha_fin,
        descripcion,
        competencias,
        hobbies,
        certificaciones,
        valores,
        idiomas,
        facebook,
        instagram,
        twitter,
        linkedIn
    } = req.body

    const {id} = req.params

    const sql = 'UPDATE curriculum SET nombre=?, apellido=?, nacimiento=?, email=?, celular=?, calle=?, colonia=?, cp=?, sexo=?, institucion=?, titulo=?, campo_estudio=?, graduacion=?, nombre_empresa=?, puesto=?, fecha_inicio=?, fecha_fin=?, descripcion=?, competencias=?, hobbies=?, certificaciones=?, valores=?, idiomas=?, facebook=?, instagram=?, twitter=?, linkedin=? WHERE id=?'

    db.query(sql, [nombre, apellido, nacimiento, email, celular, calle, colonia, cp, sexo, institucion, titulo, campo_estudio, graduacion, nombre_empresa, puesto, fecha_inicio, fecha_fin, descripcion, competencias, hobbies, certificaciones, valores, idiomas, facebook, instagram, twitter, linkedIn, id
    ], (err, result) =>{
        if(err){
            res.send({
                status: 100,
                errNo: err.errno,
                mensaje: err.message,
                codigo: err.code
            })
        } else{
            res.send({
                status: 200
            })
        }
    })
})


app.all('*', (req,res) =>{
    res.send('Esta ruta no existe')
})

app.listen(port, ()=>{
    console.log(`Escuchando por el puerto ${port}`)
})