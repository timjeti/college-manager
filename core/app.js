const express = require('express')
const mysql = require('mysql')
bodyParser = require('body-parser');
const app = express()
app.use(express.json());
const router = express.Router()
var path = require('path');
const multer = require('multer');
const port = 3000
// var urlencodedParser = bodyParser.urlencoded({ extended: false })  

var cors = require('cors');
var fileUtils = require("./FileUtils");
app.use(cors())
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const storage = multer.diskStorage({
	
	destination: (req, file, cb) => {
	console.log("cb function called")
	// fileUtils.someMethod();
	reg_id  = req.query.id
	dir_path = `uploads/${reg_id}`
	fileUtils.createDirectory(dir_path)
	cb(null, dir_path);
	},
	filename: (req, file, cb) => {
	file_name = fileUtils.geFileNameToUpload(req, file)
	cb(null, file_name);
	},
	});

// var storage =   multer.diskStorage({
// 	destination: function (req, file, callback) {
// 		callback(null, './uploads');
// 	},
// 	filename: function (req, file, callback) {
// 		callback(null, file.fieldname + '-' + Date.now());
// 	}
// 	});

// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 	   cb(null, 'uploads');
// 	},
// 	filename: function (req, file, cb) {
// 	   cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
// 	}
//  });

var upload = multer({ storage : storage})

// const upload = multer({ storage });

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

app.get('/applicantList',async (req, res) => {
	try{
		console.log('Inside get all applicant list')
		await connection.query(`SELECT id,fName,mName,lName FROM register`, (err, rows, fields) => {
			if (err) {
				res.status(404).json({ message: 'User not found' })
				} else {
				console.log(rows)
				res.status(200).json(rows)
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
	
})

app.post('/register/upload/', upload.single('image'), async (req, res) => {
	console.log("uploading picture")
	try {
		const filename = req.file;
		console.log(filename)
		res.status(201).json({ message: 'Image uploaded successfully' });
	} 
	catch (error) {
	console.log(error);
	return res.status(500).json({ message: 'Internal server error' });
	}
	}
	);

//In this api exceptions are handled properly
app.get('/register/upload/',async (req, res) => {
	try{
		var id = req.query.id
		var type = req.query.type
		console.log('Get Upload data')
		var contentType = fileUtils.getFileContentType(type)
		console.log(contentType)
		var fileName = fileUtils.getUploadedFileName(id, type)
		var absolutePath = fileUtils.getAbsolutePath(fileName);
		console.log(absolutePath)
		res.setHeader('content-type', `${contentType}`);
		res.status(200)
		return res.sendFile(absolutePath)
	}
	catch(error){
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
	
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
