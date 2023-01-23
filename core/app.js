const express = require('express')
const mysql = require('mysql')
const app = express()
app.use(express.json());
const router = express.Router()
const port = 3000
// var urlencodedParser = bodyParser.urlencoded({ extended: false })  

var cors = require('cors')
app.use(cors())
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
	var sql = "INSERT INTO test (id, name, type, email) VALUES ('3', 'Ajeet Kumar', 'USER', 'test@gmail.com')";  
	connection.query(sql, function (err, result) {  
	if (err) throw err;  
	console.log("1 record inserted");
	})
})
  
app.post('/register', (req, res) => {
	try{
      console.log(req.body)
	  const { fName, mName, lName } = req.body // destructure the request body
	  const query = `INSERT INTO register (fName, mName, lName) VALUES ('${fName}', '${mName}', '${lName}')`
	  connection.query(query, (error, results, fields) => {
		  if (error) {
			console.log(error)
			  return res.status(500).json({ message: 'Internal server error' });
		  } else {
			  return res.status(201).json({ message: 'User registered successfully' });
		  }
	  });
	} catch (error) {
	  console.log(error)
	  res.status(500).json({ message: 'Internal server error' })
	}
});


app.get('/register',(req, res) => {
	try{
		console.log('Inside db api')
		console.log(req.query)
		id  = req.query.id
		console.log(id)
		connection.query(`SELECT * FROM register where id = ${id}`, (err, rows, fields) => {
			if (err) {
				res.status(404).json({ message: 'User not found' })
				} else {
				res.status(200).json(rows[0])
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
	
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
