const express = require('express')
var path = require('path');
var fileUtils = require("../FileUtils");
const router = express.Router()
const {connection} = require('../Connection.js')



const multer = require('multer');

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

var upload = multer({ storage : storage})



router.post('/', (req, res) => {
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


router.get('/',(req, res) => {
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

router.get('/applicantList',async (req, res) => {
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

router.post('/upload', upload.single('image'), async (req, res) => {
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
router.get('/upload',async (req, res) => {
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
module.exports = router