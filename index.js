const express = require('express');
const app = express();
const { leer, create, edit, borrar } = require('./consultas')

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.listen(3000, console.log("Servidor corriendo en http://localhost:3000/"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/cursos", (req, res) => {
    leer()
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al leer los datos de la DB'}))
})


app.post("/cursos", (req, res) => {
    let { nombre, nivelTecnico, fechaInicio, duracion} = req.body;
    let datos = [nombre, nivelTecnico, fechaInicio, duracion];
        create(datos)
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al crear un nuevo curso en la DB'}))
})


app.put("/cursos", (req, res) => {
    let {id,nombre, nivelTecnico, fechaInicio, duracion} = req.body;
    let datos = [id,nombre, nivelTecnico, fechaInicio, duracion];
    //console.log(datos)
         edit(datos)
        .then(resultado => res.send(resultado))
        .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al crear un nuevo curso en la DB'})) 
})


app.delete("/cursos/:id", (req,res) => {
    let id = req.params.id;
    borrar(id)
    .then(resultado => res.send(resultado))
    .catch(error => res.status(500).send({code: 500, message: 'Ha ocurrido un error al crear un nuevo curso en la DB'})) 
    console.log(id);

})