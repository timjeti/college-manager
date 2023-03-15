const express = require('express')
var path = require('path');
var fileUtils = require("../FileUtils");
const router = express.Router()
const {connection} = require('../Connection.js')



const multer = require('multer');
const { query } = require('express');

const storage = multer.diskStorage({
	
	destination: (req, file, cb) => {
	console.log("cb function called")
	// fileUtils.someMethod();
	reg_id  = req.query.id
	dir_path = `uploads/${formData.reg_id}`
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
	  let query = prepareRegistrationQuery(req)


	//   const query = `INSERT INTO register (fName, mName, lName) VALUES ('${formData.fName}', '${formData.mName}', '${formData.lName}')`
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

function jsonParser(stringValue, key) {
	var stringVal = JSON.stringify(stringValue);
	var objectValue = JSON.parse(stringVal);
	console.log(objectValue[key])
	return objectValue[key];
 }

router.get('/',(req, res) => {
	try{
		console.log('Inside db api')
		console.log(req.query)
		userId  = req.query.userId
		connection.query(`SELECT * FROM register where userId = '${userId}'`, (err, rows, fields) => {
			if (err) {
				console.log(res.body)
				if(res.body == undefined){
					console.log("Inside Empty")
					res.status(200).json({})
				}else{
					res.status(404).json({ message: 'User not found' })
				}
			} else {
				// console.log(res)
				res.status(200).json(rows[0])
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
})

router.put('/',(req, res) => {
	try{
		console.log('Inside register update api')
		// console.log(req.query)
		// userId  = req.query.userId
		console.log(req.body)
	  	let query = updateRegistrationQuery(req)
		connection.query(query, (err, rows, fields) => {
			if (err) {
				console.log(err)
				console.log(res.body)
				if(res.body == undefined){
					console.log("Inside Empty")
					res.status(200).json({})
				}else{
					res.status(404).json({ message: 'User not found' })
				}
			} else {
				// console.log(res)
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
		res.setHeader('content-type', `${formData.contentType}`);
		res.status(200)
		return res.sendFile(absolutePath)
	}
	catch(error){
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
	
})


function prepareRegistrationQuery(req) {

	const { userId, registrationId, formData, tableData  } = req.body // destructure the request body
	console.log(registrationId)
	let applStream = jsonParser(formData,"applStream")

	let query1 = `INSERT INTO register (userId,registrationId,applStream,fName,mName,lName,dBirth,gender,stdCaste,bGroup, 
		stdPhnNumber,stdEmail,religion,stdNatlty,stdBreak,stdGapRsn,stdDisability,stdDisabilityDet,disToColl,
		aplCourse,aplCaste,aplHstl,aplAdmTyp,aplCmpSub,aplMilSub,aplElecSub1,aplElecSub2,aplElecSub3,aplElecSub4,aplGuardNm,
		aplGuardPhn,aplGuardOcp,aplGuardInc,aplFatNam,aplMotNam,aplLclGuardNam,aplLclGuardAdd,aplPerAdd,aplPerGuardPhnNum,aplPerAddLoc,
		aplPerSta,aplPerAddPs,aplPerDist,aplPerPin,aplyIsCorAdd,aplCorAdd,aplCorGuardPhnNum,aplCorAddLoc,aplCorAddPs,aplCorSta,
		aplCorDist,aplCorPin,apl12thRegNum,aplLastCol,aplLstExmPcObt,aplLastMilSub,aplLastElecSub1,aplLastElecSub2,aplLastElecSub3,aplLastElecSub4,
		aplLastEngMrk,aplLastMilMrk,aplLastElec1Mrk,aplLastElec2Mrk,aplLastElec3Mrk,aplLastElec4Mrk,aplGradCourseTaken,aplGradExmPcObt,aplExtraCur,aplBnkHldrNm,
		aplBnkAcNum,aplBnkCnfAcNum,aplBnkNam,aplBnkBrnch,aplBnkIfsc,eduhistory_table) VALUES ('${userId}','${registrationId}','${applStream}','${formData.fName}','${formData.mName}','${formData.lName}','${formData.dBirth}','${formData.gender}','${formData.stdCaste}','${formData.bGroup}',
		'${formData.stdPhnNumber}','${formData.stdEmail}','${formData.religion}','${formData.stdNatlty}','${formData.stdBreak}','${formData.stdGapRsn}','${formData.stdDisability}','${formData.stdDisabilityDet}','${formData.disToColl}',
		'${formData.aplCourse}','${formData.aplCaste}','${formData.aplHstl}','${formData.aplAdmTyp}','${formData.aplCmpSub}','${formData.aplMilSub}','${formData.aplElecSub1}','${formData.aplElecSub2}','${formData.aplElecSub3}','${formData.aplElecSub4}','${formData.aplGuardNm}',
		'${formData.aplGuardPhn}','${formData.aplGuardOcp}','${formData.aplGuardInc}','${formData.aplFatNam}','${formData.aplMotNam}','${formData.aplLclGuardNam}','${formData.aplLclGuardAdd}','${formData.aplPerAdd}','${formData.aplPerGuardPhnNum}','${formData.aplPerAddLoc}',
		'${formData.aplPerSta}','${formData.aplPerAddPs}','${formData.aplPerDist}','${formData.aplPerPin}','${formData.aplyIsCorAdd}','${formData.aplCorAdd}','${formData.aplCorGuardPhnNum}','${formData.aplCorAddLoc}','${formData.aplCorAddPs}','${formData.aplCorSta}',
		'${formData.aplCorDist}','${formData.aplCorPin}','${formData.apl12thRegNum}','${formData.aplLastCol}','${formData.aplLstExmPcObt}','${formData.aplLastMilSub}','${formData.aplLastElecSub1}','${formData.aplLastElecSub2}','${formData.aplLastElecSub3}','${formData.aplLastElecSub4}',
		'${formData.aplLastEngMrk}','${formData.aplLastMilMrk}','${formData.aplLastElec1Mrk}','${formData.aplLastElec2Mrk}','${formData.aplLastElec3Mrk}','${formData.aplLastElec4Mrk}','${formData.aplGradCourseTaken}','${formData.aplGradExmPcObt}','${formData.aplExtraCur}','${formData.aplBnkHldrNm}',
		'${formData.aplBnkAcNum}','${formData.aplBnkCnfAcNum}','${formData.aplBnkNam}','${formData.aplBnkBrnch}','${formData.aplBnkIfsc}','${JSON.stringify(tableData)}')`
	
	return query1;
}

function updateRegistrationQuery(req) {

	const { userId, registrationId, formData, tableData  } = req.body // destructure the request body
	console.log(registrationId)
	let applStream = jsonParser(formData,"applStream")

	let query1 = `UPDATE register SET registrationId='${registrationId}',applStream='${applStream}',fName='${formData.fName}',mName='${formData.mName}',lName='${formData.lName}',dBirth='${formData.dBirth}',gender='${formData.gender}',stdCaste='${formData.stdCaste}',bGroup='${formData.bGroup}', 
		stdPhnNumber='${formData.stdPhnNumber}',stdEmail='${formData.stdEmail}',religion='${formData.religion}',stdNatlty='${formData.stdNatlty}',stdBreak='${formData.stdBreak}',stdGapRsn='${formData.stdGapRsn}',stdDisability='${formData.stdDisability}',stdDisabilityDet=${formData.stdDisabilityDet}',disToColl='${formData.disToColl}',
		aplCourse='${formData.aplCourse}',aplCaste='${formData.aplCaste}',aplHstl='${formData.aplHstl}',aplAdmTyp='${formData.aplAdmTyp}',aplCmpSub'=${formData.aplCmpSub}',aplMilSub='${formData.aplMilSub}',aplElecSub1='${formData.aplElecSub1}',aplElecSub2='${formData.aplElecSub2}',aplElecSub3='${formData.aplElecSub3}',aplElecSub4='${formData.aplElecSub4}',aplGuardNm='${formData.aplGuardNm}',
		aplGuardPhn='${formData.aplGuardPhn}',aplGuardOcp='${formData.aplGuardOcp}',aplGuardInc='${formData.aplGuardInc}',aplFatNam='${formData.aplFatNam}',aplMotNam='${formData.aplMotNam}',aplLclGuardNam='${formData.aplLclGuardNam}',aplLclGuardAdd='${formData.aplLclGuardAdd}',aplPerAdd=${formData.aplPerAdd}',aplPerGuardPhnNum='${formData.aplPerGuardPhnNum}',aplPerAddLoc='${formData.aplPerAddLoc}',
		aplPerSta='${formData.aplPerSta}',aplPerAddPs='${formData.aplPerAddPs}',aplPerDist='${formData.aplPerDist}',aplPerPin='${formData.aplPerPin}',aplyIsCorAdd='${formData.aplyIsCorAdd}',aplCorAdd='${formData.aplCorAdd}',aplCorGuardPhnNum='${formData.aplCorGuardPhnNum}',aplCorAddLoc='${formData.aplCorAddLoc}',aplCorAddPs='${formData.aplCorAddPs}',aplCorSta='${formData.aplCorSta}',
		aplCorDist='${formData.aplCorDist}',aplCorPin='${formData.aplCorPin}',apl12thRegNum='${formData.apl12thRegNum}',aplLastCol='${formData.aplLastCol}',aplLstExmPcObt='${formData.aplLstExmPcObt}',aplLastMilSub='${formData.aplLastMilSub}',aplLastElecSub1='${formData.aplLastElecSub1}',aplLastElecSub2='${formData.aplLastElecSub2}',aplLastElecSub3='${formData.aplLastElecSub3}',aplLastElecSub4='${formData.aplLastElecSub4}',
		aplLastEngMrk='${formData.aplLastEngMrk}',aplLastMilMrk='${formData.aplLastMilMrk}',aplLastElec1Mrk='${formData.aplLastElec1Mrk}',aplLastElec2Mrk='${formData.aplLastElec2Mrk}',aplLastElec3Mrk='${formData.aplLastElec3Mrk}',aplLastElec4Mrk='${formData.aplLastElec4Mrk}',aplGradCourseTaken='${formData.aplGradCourseTaken}',aplGradExmPcObt='${formData.aplGradExmPcObt}',aplExtraCur='${formData.aplExtraCur}',aplBnkHldrNm='${formData.aplBnkHldrNm}',
		aplBnkAcNum='${formData.aplBnkAcNum}',aplBnkCnfAcNum='${formData.aplBnkCnfAcNum}',aplBnkNam='${formData.aplBnkNam}',aplBnkBrnch='${formData.aplBnkBrnch}',aplBnkIfsc='${formData.aplBnkIfsc}',eduhistory_table='${JSON.stringify(tableData)}' WHERE userId='${userId}'`
	
	return query1;
}

module.exports = router