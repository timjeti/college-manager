const mysql = require('mysql')
const port = 3000

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Metamorphosis1992@',
	//password: '',
	database: 'college'
  })

connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
  });


exports.connection = connection