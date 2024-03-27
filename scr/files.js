const { info } = require('console');
const e = require('express');
const fs = require('fs');
function readFileSync(path){
    const data = fs.readFileSync(path);
    const todos = JSON.parse(data).todos;
    return todos;
}
function escribirarchivo(path, todos){
    const data =JSON.stringify({'todos': data});
    fs.writeFileSync(path, info);

}
module.exports = {
    readFileSync,
    escribirarchivo
}

// console.log('arguments',arguments)
// console.log('exports',exports)
// console.log('module',module)
// console.log('require',require)
// console.log('__filename',__filename)
// console.log('__dirname',__dirname)

