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
		id  = req.query.id
		connection.query(`SELECT * FROM register where id = ${formData.id}`, (err, rows, fields) => {
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

	const { registrationId, formData, tableData  } = req.body // destructure the request body
	console.log(registrationId)
	let applStream = jsonParser(formData,"applStream")
	let query1 = ''
	if(applStream == 'HS'){
		query1 = `Select * from register_hs (registrationId,applStream,fName,mName,lName,dBirth,gender,stdCaste,bGroup, 
			stdPhnNumber,stdEmail,religion,stdNatlty,stdBreak,stdGapRsn,stdDisability,stdDisabilityDet,disToColl,
			aplCourse,aplCaste,aplHstl,aplAdmTyp,aplCmpSub,aplMilSub,aplElecSub1,aplElecSub2,aplElecSub3,aplElecSub4,aplGuardNm,
			aplGuardPhn,aplGuardOcp,aplGuardInc,aplFatNam,aplMotNam,aplLclGuardNam,aplLclGuardAdd,aplPerAdd,aplPerGuardPhnNum,aplPerAddLoc,
			aplPerSta,aplPerAddPs,aplPerDist,aplPerPin,aplyIsCorAdd,aplCorAdd,aplCorGuardPhnNum,aplCorAddLoc,aplCorAddPs,aplCorSta,
			aplCorDist,aplCorPin,aplLastCol,aplLstExmPcObt,aplLastMilSub,aplLastElecSub1,aplLastElecSub2,aplLastElecSub3,aplLastElecSub4,
			aplLastEngMrk,aplLastMilMrk,aplLastElec1Mrk,aplLastElec2Mrk,aplLastElec3Mrk,aplLastElec4Mrk,aplExtraCur,aplBnkHldrNm,
			aplBnkAcNum,aplBnkCnfAcNum,aplBnkNam,aplBnkBrnch,aplBnkIfsc,eduhistory_table) VALUES ('${registrationId}','${applStream}','${formData.fName}','${formData.mName}','${formData.lName}','${formData.dBirth}','${formData.gender}','${formData.stdCaste}','${formData.bGroup}',
			'${formData.stdPhnNumber}','${formData.stdEmail}','${formData.religion}','${formData.stdNatlty}','${formData.stdBreak}','${formData.stdGapRsn}','${formData.stdDisability}','${formData.stdDisabilityDet}','${formData.disToColl}',
			'${formData.aplCourse}','${formData.aplCaste}','${formData.aplHstl}','${formData.aplAdmTyp}','${formData.aplCmpSub}','${formData.aplMilSub}','${formData.aplElecSub1}','${formData.aplElecSub2}','${formData.aplElecSub3}','${formData.aplElecSub4}','${formData.aplGuardNm}',
			'${formData.aplGuardPhn}','${formData.aplGuardOcp}','${formData.aplGuardInc}','${formData.aplFatNam}','${formData.aplMotNam}','${formData.aplLclGuardNam}','${formData.aplLclGuardAdd}','${formData.aplPerAdd}','${formData.aplPerGuardPhnNum}','${formData.aplPerAddLoc}',
			'${formData.aplPerSta}','${formData.aplPerAddPs}','${formData.aplPerDist}','${formData.aplPerPin}','${formData.aplyIsCorAdd}','${formData.aplCorAdd}','${formData.aplCorGuardPhnNum}','${formData.aplCorAddLoc}','${formData.aplCorAddPs}','${formData.aplCorSta}',
			'${formData.aplCorDist}','${formData.aplCorPin}','${formData.aplLastCol}','${formData.aplLstExmPcObt}','${formData.aplLastMilSub}','${formData.aplLastElecSub1}','${formData.aplLastElecSub2}','${formData.aplLastElecSub3}','${formData.aplLastElecSub4}',
			'${formData.aplLastEngMrk}','${formData.aplLastMilMrk}','${formData.aplLastElec1Mrk}','${formData.aplLastElec2Mrk}','${formData.aplLastElec3Mrk}','${formData.aplLastElec4Mrk}','${formData.aplExtraCur}','${formData.aplBnkHldrNm}',
			'${formData.aplBnkAcNum}','${formData.aplBnkCnfAcNum}','${formData.aplBnkNam}','${formData.aplBnkBrnch}','${formData.aplBnkIfsc}','${tableData}')`
	}else if(applStream == 'graduation'){
		query1 = `INSERT INTO register_graduation (registrationId,applStream,fName,mName,lName,dBirth,gender,stdCaste,bGroup, 
			stdPhnNumber,stdEmail,religion,stdNatlty,stdBreak,stdGapRsn,stdDisability,stdDisabilityDet,disToColl,
			aplCourse,aplCaste,aplHstl,aplAdmTyp,aplCmpSub,aplMilSub,aplHnrSub1,aplHnrSub2,aplHnrSub3,aplHnrSub4,aplGuardNm,
			aplGuardPhn,aplGuardOcp,aplGuardInc,aplFatNam,aplMotNam,aplLclGuardNam,aplLclGuardAdd,aplPerAdd,aplPerGuardPhnNum,aplPerAddLoc,
			aplPerSta,aplPerAddPs,aplPerDist,aplPerPin,aplyIsCorAdd,aplCorAdd,aplCorGuardPhnNum,aplCorAddLoc,aplCorAddPs,aplCorSta,
			aplCorDist,aplCorPin,apl12thRegNum,aplLastCol,aplLstExmPcObt,aplLastMilSub,aplLastElecSub1,aplLastElecSub2,aplLastElecSub3,aplLastElecSub4,
			aplLastEngMrk,aplLastMilMrk,aplLastElec1Mrk,aplLastElec2Mrk,aplLastElec3Mrk,aplLastElec4Mrk,aplExtraCur,aplBnkHldrNm,
			aplBnkAcNum,aplBnkCnfAcNum,aplBnkNam,aplBnkBrnch,aplBnkIfsc,eduhistory_table) VALUES ('${registrationId}','${applStream}','${formData.fName}','${formData.mName}','${formData.lName}','${formData.dBirth}','${formData.gender}','${formData.stdCaste}','${formData.bGroup}',
			'${formData.stdPhnNumber}','${formData.stdEmail}','${formData.religion}','${formData.stdNatlty}','${formData.stdBreak}','${formData.stdGapRsn}','${formData.stdDisability}','${formData.stdDisabilityDet}','${formData.disToColl}',
			'${formData.aplCourse}','${formData.aplCaste}','${formData.aplHstl}','${formData.aplAdmTyp}','${formData.aplCmpSub}','${formData.aplMilSub}','${formData.aplHnrSub1}','${formData.aplHnrSub2}','${formData.aplHnrSub3}','${formData.aplHnrSub4}','${formData.aplGuardNm}',
			'${formData.aplGuardPhn}','${formData.aplGuardOcp}','${formData.aplGuardInc}','${formData.aplFatNam}','${formData.aplMotNam}','${formData.aplLclGuardNam}','${formData.aplLclGuardAdd}','${formData.aplPerAdd}','${formData.aplPerGuardPhnNum}','${formData.aplPerAddLoc}',
			'${formData.aplPerSta}','${formData.aplPerAddPs}','${formData.aplPerDist}','${formData.aplPerPin}','${formData.aplyIsCorAdd}','${formData.aplCorAdd}','${formData.aplCorGuardPhnNum}','${formData.aplCorAddLoc}','${formData.aplCorAddPs}','${formData.aplCorSta}',
			'${formData.aplCorDist}','${formData.aplCorPin}','${formData.apl12thRegNum}','${formData.aplLastCol}','${formData.aplLstExmPcObt}','${formData.aplLastMilSub}','${formData.aplLastElecSub1}','${formData.aplLastElecSub2}','${formData.aplLastElecSub3}','${formData.aplLastElecSub4}',
			'${formData.aplLastEngMrk}','${formData.aplLastMilMrk}','${formData.aplLastElec1Mrk}','${formData.aplLastElec2Mrk}','${formData.aplLastElec3Mrk}','${formData.aplLastElec4Mrk}','${formData.aplExtraCur}','${formData.aplBnkHldrNm}',
			'${formData.aplBnkAcNum}','${formData.aplBnkCnfAcNum}','${formData.aplBnkNam}','${formData.aplBnkBrnch}','${formData.aplBnkIfsc}','${tableData}')`
	}else if(applStream == 'master'){
		query1 = `INSERT INTO register_masters (registrationId,applStream,fName,mName,lName,dBirth,gender,stdCaste,bGroup, 
			stdPhnNumber,stdEmail,religion,stdNatlty,stdBreak,stdGapRsn,stdDisability,stdDisabilityDet,disToColl,
			aplCourse,aplCaste,aplHstl,aplAdmTyp,aplGuardNm,
			aplGuardPhn,aplGuardOcp,aplGuardInc,aplFatNam,aplMotNam,aplLclGuardNam,aplLclGuardAdd,aplPerAdd,aplPerGuardPhnNum,aplPerAddLoc,
			aplPerSta,aplPerAddPs,aplPerDist,aplPerPin,aplyIsCorAdd,aplCorAdd,aplCorGuardPhnNum,aplCorAddLoc,aplCorAddPs,aplCorSta,
			aplCorDist,aplCorPin,aplLastCol,aplGradCourseTaken,aplGradExmPcObt,aplExtraCur,aplBnkHldrNm,
			aplBnkAcNum,aplBnkCnfAcNum,aplBnkNam,aplBnkBrnch,aplBnkIfsc,eduhistory_table) VALUES ('${registrationId}','${applStream}','${formData.fName}','${formData.mName}','${formData.lName}','${formData.dBirth}','${formData.gender}','${formData.stdCaste}','${formData.bGroup}',
			'${formData.stdPhnNumber}','${formData.stdEmail}','${formData.religion}','${formData.stdNatlty}','${formData.stdBreak}','${formData.stdGapRsn}','${formData.stdDisability}','${formData.stdDisabilityDet}','${formData.disToColl}',
			'${formData.aplCourse}','${formData.aplCaste}','${formData.aplHstl}','${formData.aplAdmTyp}','${formData.aplGuardNm}',
			'${formData.aplGuardPhn}','${formData.aplGuardOcp}','${formData.aplGuardInc}','${formData.aplFatNam}','${formData.aplMotNam}','${formData.aplLclGuardNam}','${formData.aplLclGuardAdd}','${formData.aplPerAdd}','${formData.aplPerGuardPhnNum}','${formData.aplPerAddLoc}',
			'${formData.aplPerSta}','${formData.aplPerAddPs}','${formData.aplPerDist}','${formData.aplPerPin}','${formData.aplyIsCorAdd}','${formData.aplCorAdd}','${formData.aplCorGuardPhnNum}','${formData.aplCorAddLoc}','${formData.aplCorAddPs}','${formData.aplCorSta}',
			'${formData.aplCorDist}','${formData.aplCorPin}','${formData.aplLastCol}','${formData.aplGradCourseTaken}','${formData.aplGradExmPcObt}','${formData.aplExtraCur}','${formData.aplBnkHldrNm}',
			'${formData.aplBnkAcNum}','${formData.aplBnkCnfAcNum}','${formData.aplBnkNam}','${formData.aplBnkBrnch}','${formData.aplBnkIfsc}','${JSON.stringify(tableData)}')`
	}
	return query1;
}


module.exports = router