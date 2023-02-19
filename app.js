const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
var app = express()
const cors = require ('cors')
// Defining the port number. 
// It is important to set to process.env.PORT 
// since Lambda will define the PORT explicitly
const PORT = process.env.PORT || 8080
// Supporting every type of body content type
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//Use below codes to automatically add your routing files (endpoints)
var routes = fs.readdirSync(path.join(__dirname, '/route'))
routes.forEach(routesFile => {
    if (routesFile.match(/\.js$/)) {
        var route = require(path.join(__dirname, '/route/', routesFile))
        route(app)
    }
})
// show the running port on console
app.listen(PORT, function() {
    console.log('server started on port ', PORT)
})

app.use((request,response, next) =>{
    response.header("Access-Control-Allow-Orgin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.use (cors())