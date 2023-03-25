const express = require('express')
var path = require('path');
var fileUtils = require("../FileUtils");
const router = express.Router()
const {connection} = require('../Connection.js')
var mysql = require('mysql');



const multer = require('multer');
const { query } = require('express');

const storage = multer.diskStorage({

	destination: (req, file, cb) => {
	console.log("cb function called")
	// fileUtils.someMethod();
	reg_id  = req.query.registrationId
	dir_path = `uploads/${reg_id}`
	fileUtils.createDirectory(dir_path)
	cb(null, dir_path);
	},
	filename: (req, file, cb) => {
	file_name = fileUtils.geFileNameToUpload(req, file)
	cb(null, file_name);
	}
});


var upload = multer({ storage : storage})



router.post('/', (req, res) => {
	try{
	  console.log('Create single user registration db details')
      console.log(req.body)
	  let query = prepareRegistrationQuery(req)


	//   const query = `INSERT INTO register (fName, mName, lName) VALUES ('${formData.fName}', '${formData.mName}', '${formData.lName}')`
	  connection.query(query, (error, results, fields) => {
		  if (error) {
			console.log(error)
			  return res.status(500).json({ type: "ERROR", status:500, message: error });
		  } else {
			  return res.status(201).json({ message: 'User registered successfully' });
		  }
	  });
	} catch (error) {
	  console.log(error)
	  res.status(500).json({ type: "ERROR", status:500, message: error })
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
		console.log('Get single user registration db data')
		console.log(req.query)
		userId  = req.query.userId
		registrationId = req.query.registrationId
		console.log(userId)
		console.log(registrationId)
		let query = ''
		if(userId !== undefined){
			query = `SELECT * FROM register where userId = '${userId}'`
		}else if(registrationId !== undefined){
			query = `SELECT * FROM register where registrationId = '${registrationId}'`
		}
		console.log(query)
		connection.query(query, (err, rows, fields) => {
			if (err) {
				console.log(res.body)
				if(res.body == undefined){
					// console.log("Inside Empty")
					res.status(500).json({type: "ERROR", status:500, message: error})
				}else{
					res.status(404).json({ type: "ERROR", status:404, message: 'User not found' })
				}
			} else {
				console.log(rows)
				res.status(200).json(rows[0])
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({type: "ERROR", status:500, message: error })
	}
})

router.put('/',(req, res) => {
	try{
		console.log('Update single user registration db data')
		// console.log(req.query)
		// userId  = req.query.userId
		// console.log(req.body)
	  	let query = updateRegistrationQuery(req)
		connection.query(query, (err, rows, fields) => {
			if (err) {
				console.log(err)
				console.log(res.body)
				if(res.body == undefined){
					console.log("Inside Empty")
					res.status(500).json({ status:500, message: err})
				}else{
					res.status(404).json({ type: "ERROR", status:404, message: 'User not found' })
				}
			} else {
				// console.log(res)
				res.status(200).json(rows[0])
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({ type: "ERROR", message: 'Internal server error' })
	}
})

router.get('/applicantList',async (req, res) => {
	try{
		console.log('Inside get all applicant list')
		await connection.query(`SELECT id,registrationId,fName,mName,lName FROM register`, (err, rows, fields) => {
			if (err) {
				res.status(404).json({ type: "ERROR", message: 'User not found' })
				} else {
				console.log(rows)
				res.status(200).json(rows)
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({ type: "ERROR", status:500, message: error })
	}
	
})

router.post('/upload', upload.single('image'), async (req, res) => {
	
	console.log("uploading picture")
	try {
		const filename = req.file;
		console.log(filename)
		type = req.query.type
		registrationId = req.query.registrationId
		const query = `INSERT INTO register_binary (registrationId, ${mysql.escapeId(type)}) VALUES (${mysql.escape(registrationId)}, 1 )
		ON DUPLICATE KEY UPDATE ${mysql.escapeId(type)} = 1`
		console.log(query)
		connection.query(query, (err, rows, fields) => {
		if (err) {
			console.log("Unable to store Binary File Upload details in DB, although stored locally")
			console.log(err)
			res.status(500).json({ type: "ERROR",  status:500, message: err })
			// }
		} else {
			console.log("Binary File Upload details successfully stored in Local & DB")
			// res.status(200).json({message: "Approved status updated successfully"})
			res.status(201).json({ status:201, message: 'Image uploaded successfully' });
		}
	  })
	} 
	catch (error) {
	console.log(error);
	return res.status(500).json({ type: "ERROR", status:500, message: error });
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
		res.status(500).json({ type: "ERROR", status:500, message: error })
	}
	
})

//Get the details of uploaded docs as part of registratioon
router.get('/upload/details',async (req, res) => {
	try{
		var registrationId = req.query.registrationId
		const query = `SELECT * FROM register_binary WHERE registrationId=${mysql.escape(registrationId)}`
		connection.query(query, (err, rows, fields) => {
			if (err) {
				console.log(err)
				res.status(500).json({ type: "ERROR",  status:500, message: err })
			} else {
				res.status(200).json(rows[0])
			}
	  })
		
	}
	catch(error){
		console.log(error)
		res.status(500).json({ type: "ERROR", status:500, message: error })
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

	let query1 = `UPDATE register SET applStream='${applStream}',fName='${formData.fName}',mName='${formData.mName}'
	,lName='${formData.lName}',dBirth='${formData.dBirth}',gender='${formData.gender}',stdCaste='${formData.stdCaste}',bGroup='${formData.bGroup}', 
		stdPhnNumber='${formData.stdPhnNumber}',stdEmail='${formData.stdEmail}',religion='${formData.religion}',stdNatlty='${formData.stdNatlty}',
		stdBreak='${formData.stdBreak}',stdGapRsn='${formData.stdGapRsn}',stdDisability='${formData.stdDisability}',
		stdDisabilityDet='${formData.stdDisabilityDet}',disToColl='${formData.disToColl}',aplCourse='${formData.aplCourse}',
		aplCaste='${formData.aplCaste}',aplHstl='${formData.aplHstl}',aplAdmTyp='${formData.aplAdmTyp}',aplCmpSub='${formData.aplCmpSub}',
		aplMilSub='${formData.aplMilSub}',aplElecSub1='${formData.aplElecSub1}',aplElecSub2='${formData.aplElecSub2}',
		aplElecSub3='${formData.aplElecSub3}',aplElecSub4='${formData.aplElecSub4}',
		aplGuardNm='${formData.aplGuardNm}',aplGuardPhn='${formData.aplGuardPhn}',aplGuardOcp='${formData.aplGuardOcp}',
		aplGuardInc='${formData.aplGuardInc}',aplFatNam='${formData.aplFatNam}',aplMotNam='${formData.aplMotNam}',
		aplLclGuardNam='${formData.aplLclGuardNam}',aplLclGuardAdd='${formData.aplLclGuardAdd}',
		aplPerAdd='${formData.aplPerAdd}',aplPerGuardPhnNum='${formData.aplPerGuardPhnNum}',aplPerAddLoc='${formData.aplPerAddLoc}',
		aplPerSta='${formData.aplPerSta}',aplPerAddPs='${formData.aplPerAddPs}',aplPerDist='${formData.aplPerDist}',aplPerPin='${formData.aplPerPin}',
		aplyIsCorAdd='${formData.aplyIsCorAdd}',aplCorAdd='${formData.aplCorAdd}',aplCorGuardPhnNum='${formData.aplCorGuardPhnNum}',
		aplCorAddLoc='${formData.aplCorAddLoc}',aplCorAddPs='${formData.aplCorAddPs}',aplCorSta='${formData.aplCorSta}',
		aplCorDist='${formData.aplCorDist}',aplCorPin='${formData.aplCorPin}',apl12thRegNum='${formData.apl12thRegNum}',
		aplLastCol='${formData.aplLastCol}',aplLstExmPcObt='${formData.aplLstExmPcObt}',aplLastMilSub='${formData.aplLastMilSub}',
		aplLastElecSub1='${formData.aplLastElecSub1}',aplLastElecSub2='${formData.aplLastElecSub2}',aplLastElecSub3='${formData.aplLastElecSub3}',
		aplLastElecSub4='${formData.aplLastElecSub4}',aplLastEngMrk='${formData.aplLastEngMrk}',aplLastMilMrk='${formData.aplLastMilMrk}',
		aplLastElec1Mrk='${formData.aplLastElec1Mrk}',aplLastElec2Mrk='${formData.aplLastElec2Mrk}',aplLastElec3Mrk='${formData.aplLastElec3Mrk}',
		aplLastElec4Mrk='${formData.aplLastElec4Mrk}',aplGradCourseTaken='${formData.aplGradCourseTaken}',aplGradExmPcObt='${formData.aplGradExmPcObt}',
		aplExtraCur='${formData.aplExtraCur}',aplBnkHldrNm='${formData.aplBnkHldrNm}',aplBnkAcNum='${formData.aplBnkAcNum}',
		aplBnkCnfAcNum='${formData.aplBnkCnfAcNum}',aplBnkNam='${formData.aplBnkNam}',aplBnkBrnch='${formData.aplBnkBrnch}',
		aplBnkIfsc='${formData.aplBnkIfsc}',eduhistory_table='${JSON.stringify(tableData)}' WHERE userId='${userId}'`
	console.log(query1)
	console.log("")
	query1 = query1.replace(/(\r\n|\n|\r)/gm, "");
	console.log(query1)
	return query1;
}



///ReGISTRATION STATUS///
// router.put('/status/approval',(req, res) => {
// 	try{
// 		console.log('Update approval status')
// 		// console.log(req.query)
// 		const {registrationId, approved_status, approved_msg} = req.body
// 		let query1 = `UPDATE register_status SET approved_status='${approved_status}', approved_msg='${approved_msg}' WHERE registrationId='${registrationId}'`
// 		connection.query(query1, (err, rows, fields) => {
// 			if (err) {
// 				console.log(err)
// 				console.log(res.body)
// 				res.status(500).json({ type: "ERROR",  status:500, message: err })
// 			} else {
// 				// console.log(res)
// 				res.status(200).json(rows[0])
// 			}
// 	  })
// 	}
// 	catch(error){
// 		console.log(error)
// 		res.status(500).json({ message: 'Internal server error' })
// 	}
// })


router.post('/status/approval',(req, res) => {
	try{
		console.log('Add approval status for a registration')
		// console.log(req.query)
		const {registrationId, approved_status, approved_msg} = req.body
		let query1 = `INSERT INTO register_status (registrationId, approved_status, approved_msg)
		 VALUES ('${registrationId}', '${approved_status}', '${approved_msg}')
		 ON DUPLICATE KEY UPDATE approved_status='${approved_status}', approved_msg='${approved_msg}'`
		connection.query(query1, (err, rows, fields) => {
			if (err) {
				console.log(err)
				console.log(res.body)
				// if(res.body == undefined){
				// 	console.log("Inside Empty")
				// 	res.status(500).json({ type: "ERROR",  status:500, message: err})
				// }else{
					res.status(500).json({ type: "ERROR",  status:500, message: err })
				// }
			} else {
				// console.log(res)
				res.status(200).json({message: "Approved status updated successfully"})
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({ type: "ERROR", message: 'Internal server error' })
	}
})

// router.put('/status/selection',(req, res) => {
// 	try{
// 		console.log('Update selection status for a registration')
// 		// console.log(req.query)
// 		const {registrationId, selected_status, selected_msg} = req.body
// 		let query1 = `UPDATE register_status SET selected_status='${selected_status}', selected_msg='${selected_msg}' WHERE registrationId='${registrationId}'`
// 		connection.query(query1, (err, rows, fields) => {
// 			if (err) {
// 				console.log(err)
// 				console.log(res.body)
// 				res.status(500).json({ type: "ERROR",  status:500, message: err })
// 			} else {
// 				// console.log(res)
// 				res.status(200).json(rows[0])
// 			}
// 	  })
// 	}
// 	catch(error){
// 		console.log(error)
// 		res.status(500).json({ message: 'Internal server error' })
// 	}
// })


router.post('/status/selection',(req, res) => {
	try{
		console.log('Add selected status for a registration')
		// console.log(req.query)
		const {registrationId, selected_status, selected_msg} = req.body
		let query1 = `INSERT INTO register_status (registrationId, selected_status, selected_msg) 
		VALUES ('${registrationId}', '${selected_status}', '${selected_msg}')
		ON DUPLICATE KEY UPDATE selected_status='${selected_status}', selected_msg='${selected_msg}'`
		connection.query(query1, (err, rows, fields) => {
			if (err) {
				console.log(err)
				console.log(res.body)
				res.status(500).json({ type: "ERROR",  status:500, message: err })
			} else {
				// console.log(res)
				res.status(200).json(rows[0])
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({ type: "ERROR", message: 'Internal server error' })
	}
})

router.post('/notification/approval',(req, res) => {
	try{
		console.log('Add notification for approval status for a registration')
		// console.log(req.query)
		const {registrationId, approved_status_notification, approved_status_notification_tstamp} = req.body
		let query1 = `INSERT INTO register_notification (registrationId, approved_status_notification, approved_status_notification_tstamp) 
		VALUES ('${registrationId}', '${approved_status_notification}', '${approved_status_notification_tstamp}')
		ON DUPLICATE KEY UPDATE approved_status_notification='${approved_status_notification}', approved_status_notification_tstamp='${approved_status_notification_tstamp}'`
		connection.query(query1, (err, rows, fields) => {
			if (err) {
				console.log(err)
				console.log(res.body)
				res.status(500).json({ type: "ERROR",  status:500, message: err })
			} else {
				// console.log(res)
				res.status(200).json(rows[0])
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({ type: "ERROR", message: 'Internal server error' })
	}
})

router.post('/notification/selection',(req, res) => {
	try{
		console.log('Add selected status in notification table for a registration')
		// console.log(req.query)
		const {registrationId, selected_status_notification, selected_status_notification_tstamp} = req.body
		let query1 = `INSERT INTO register_notification (registrationId, selected_status_notification, selected_status_notification_tstamp) 
		VALUES ('${registrationId}', '${selected_status_notification}', '${selected_status_notification_tstamp}')
		ON DUPLICATE KEY UPDATE selected_status_notification='${selected_status_notification}', selected_status_notification_tstamp='${selected_status_notification_tstamp}'`
		connection.query(query1, (err, rows, fields) => {
			if (err) {
				console.log(err)
				console.log(res.body)
				res.status(500).json({ type: "ERROR",  status:500, message: err})
			} else {
				// console.log(res)
				res.status(200).json(rows[0])
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({ type: "ERROR", message: 'Internal server error' })
	}
})


// router.put('/status/selection',(req, res) => {
// 	try{
// 		console.log('Update selection status for a registration')
// 		// console.log(req.query)
// 		const {registrationId, selected_status, selected_msg} = req.body
// 		let query1 = `UPDATE register_status SET selected_status='${selected_status}', selected_msg='${selected_msg}' WHERE registrationId='${registrationId}')`
// 		connection.query(query1, (err, rows, fields) => {
// 			if (err) {
// 				console.log(err)
// 				console.log(res.body)
// 				res.status(500).json({ type: "ERROR",  status:500, message: err })
// 			} else {
// 				// console.log(res)
// 				res.status(200).json(rows[0])
// 			}
// 	  })
// 	}
// 	catch(error){
// 		console.log(error)
// 		res.status(500).json({ message: 'Internal server error' })
// 	}
// })

router.get('/review/',(req, res) => {
	try{
		console.log('Get single user registration db data')

		// registrationId = req.query.registrationId
		let query = ''

		query = 'SELECT register.registrationId, fname, mName,lName,register_status.approved_status, register_status.approved_msg FROM register LEFT JOIN register_status ON register.registrationId=register_status.registrationId'
		
		console.log(query)
		connection.query(query, (err, rows, fields) => {
			if (err) {
				
				res.status(500).json({ type: "ERROR",  status:500, message: err })
				
			} else {
				console.log(rows[0])
				res.status(200).json(rows)
			}
	  })
	}
	catch(error){
		console.log(error)
		res.status(500).json({type: "ERROR", status:500, message: error })
	}
})


module.exports = router