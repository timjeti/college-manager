const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3001

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


app.get('/',(req,res) => {
	data = {}
	connection.query('SELECT * FROM test', (err, rows, fields) => {
		console.log('Inside db api')
		console.log('The solution is: ', rows)
		data = rows
	  })
	console.log('Inside get api')
	res.send(data)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
