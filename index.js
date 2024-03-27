//crear servidor 
const express = require ('express')
const fs = require('fs')
const{ readFileSync, escribirarchivo} = require('./scr/files')
const app = express()
app.use(express.json())

//ruta home
app.get('/todos', (req,res) => {
    //leer archivos
    const todos = readFileSync('./db.json')
    res.send(todos)

})
//show
app.get('/todos/:id', (req,res) => {
    const id = req.params.id
    const todos = readFileSync('./db.json')
    const todo = todos.find(todo => todo.id === parseInt(id))
    //no existe
    if(! todo == undefined){
        res.status(404).send('no existe')
        return
    }
    //existe
    res.send(todo)

})
//store
app.post ('/todos', (req,res) => {
   const todo = req.body
   const todos = readFileSync ('./db.json')
   todo.id= todos.length +1
   todos.push(todo)
   //escribir archivo
   escribirarchivo('./dbjson', todos)
   res.status(201).send(todo)

})
app.put('/todos/:id', (req,res) => {
    res.send('hello  from put')

})
app.delete('/todos/:id', (req,res) => {
    res.send('hello  from delete')

})


//levantamos el servidor para el puerto 3000
app.listen(3000, () => {
    console.log('listening on port 3000');
})
