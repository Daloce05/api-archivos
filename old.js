const http = require ('http');

const server = http.createServer((req,res) => {
    console.log('Request received');
    res.writeHead(200,{'Content-Type':'text/plain'} );
    res.end('hello world');
    //res.end(greet());
});

server.listen(3000, () => {
    console.log('listening on port 3000');
})

// function greet(){
//     return 'hello world from greet mode';
// }

// const greet = () => {
//     return 'hello world from greet mode 2'
// }

