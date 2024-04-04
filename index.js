//crear servidor 
const express = require ('express')
const fs = require('fs')
const{ readFileSync, escribirarchivo} = require('./scr/files')
const app = express()
app.use(express.json())
app.use((req,res,next )=> {
    console.log('middleware')
    next()
}) 
//ruta home
app.get('/todos', (req,res) => {
    //leer archivos

    const todos = readFileSync('./db.json')
    res.send(todos)
    

})
//show
app.get(
    '/todos/:id',
(req, res, next) => {
    console.log('middleware a nivel de ruta')
    next()
},


     (req, res) => {
const id = req.params.id
const todos = readFileSync('./dB.json')
const todo = todos.find(todo => todo.id === parseInt (id))

//no existe
if (!todo){
    res.status(404).send('El todo no existe')
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
    //buscar la tarea con el id recibido en la url 
    const id = req.params.id
    const todos = readFileSync('./db.json')
    const todo = todos.find (todo => todo.id === parseInt(id))
    //no existe 
    if(!todo){
        res.statu(404).send('no existe')
        return
    }
    //existe
    const newTodo = {...todo, ...req.body}//spread operator
    const index = todos.indexOf(todo)
    todos [index] = newTodo
    //escribir archivo 
    readFileSync ('./db.json',todos)
    res.send(newTodo)

})


app.delete('/todos/:id', (req,res) => {
    const id = req.params.id
    const todos = readFileSync ('./db.json')
    const todo = todos.find(todo => todo.id ===parseInt(id))

    //no existe 
    if(!todo){
        res.status(404).send('no existe')
        return
    }

    //existe 
    const index = todos.indexOf(todo)
    todos.splice(index,1)
    //escribir archivo 
    escribirarchivo('./db.json', todos)
    res.send(todo)

})


//levantamos el servidor para el puerto 3000
app.listen(3000, () => {
    console.log('listening on port 3000');
})
