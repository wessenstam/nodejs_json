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
//var values = [];
const queryString="INSERT INTO members (name, age) VALUES (?,?)"

//for(var i=0; i< 1; i++)
//  values.push([jsondata[i].name,jsondata[i].age]);

for(var i=0; i< jsondata.length; i++){
    var var_name=jsondata[i].name
    var var_age=jsondata[i].age


    //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
    connection.query(queryString, [var_name,var_age],(err, results,fields)=>{
        if(err){
        console.log("DEBUG: Failed to insert new user: "+err)
        res.sendStatus(500)
        return
        }

        console.log("DEBUG: Inserted a new user with id: ",results.insertId);
        res.end()
    })
    res.end()
}
});
