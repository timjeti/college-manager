const express = require('express')
bodyParser = require('body-parser');
var cors = require('cors');

const app = express()
const port = 3000

const registerRoute = require('./routes/register')
const courseRoute = require('./routes/course')
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded

app.use('/register', registerRoute)
app.use('/course', courseRoute)


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
