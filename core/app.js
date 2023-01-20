const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3001

let data

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Metamorphosis1992@',
	database: 'college'
  })

connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
  });


app.get('/',(req, res) => {
	
	connection.query('SELECT * FROM test', (err, rows, fields) => {
		console.log('Inside db api')
		console.log('The solution is: ', rows)
		data = rows[0]
		console.log(data)
		console.log('Sending api result to ui')
		res.send(data)
	  })
	
})

app.get('/insert', (req, res) => {
	var sql = "INSERT INTO test (id, name, type, email) VALUES ('2', 'Ajeet Kumar', 'USER', 'test@gmail.com')";  
	connection.query(sql, function (err, result) {  
	if (err) throw err;  
	console.log("1 record inserted");
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
