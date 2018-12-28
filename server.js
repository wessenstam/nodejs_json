//Parse data from JSON POST and insert into MYSQL

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// Configure MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'nutanix/4u',
	database: 'node_project'
  })

//Establish MySQL connection
connection.connect(function(err) {
   if (err) 
      throw err
   else {
       console.log('Connected to MySQL');
       // Start the app when connection is ready
       app.listen(3000);
       console.log('Server listening on port 3000');
 }
});

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+ '/myfile.html'));
});

app.post('/', function(req, res) {

    var jsondata = req.body;
    var values = [];

    for(var i=0; i< jsondata.length; i++)
        values.push([jsondata[i].name,jsondata[i].age]);

    //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
    connection.query('INSERT INTO members (name, age) VALUES ?', [values], function(err,result) {
        if(err) {
            res.send('Error');
        }
        else {
            res.send('Success');
        }
    });
});