//Parse data from JSON POST and insert into MYSQL

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const morgan=require('morgan')


app.use(morgan('short'))
app.listen(3000);
console.log('Server listening on port 3000');

app.use(bodyParser.json())



app.post('/', function(req, res) {

    var jsondata = req.body
    console.log('====== Object.keys ======')
    console.log(jsondata)
    res.end()
});