const express = require('express')
const app = express()
const http = require('http')
const path = require('path')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views','viewsPath')

// setup 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/echo', (request, response) => {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

	console.log(`==== ${request.method} ${request.url}`);
	console.log('> Headers');
        console.log(request.headers);

	console.log('> Body');
	console.log(body);
        response.end();
    });
})

app.get('/echo2', (request, response) => {
   	console.log(request.query)
    response.send({
        products: []
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})