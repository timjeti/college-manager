const express = require("express")
const { connection } = require('../Connection.js')

const router = express.Router()

var restUtils = require('./RestUtils.js')


//api to create a new subject
router.post("/", (req,res) =>{
    const { feeheadName } = req.body
    query = `ALTER TABLE coll_feehead ADD COLUMN ${feeheadName} VARCHAR(25) NOT NULL`;  
    return restUtils.executeCommitQuery(query, res)
})

router.get("/feeheads", (req,res) =>{
    const { feeheadName } = req.body
    query = 'SHOW COLUMNS FROM coll_feehead';  
    try{
        connection.query(query, (error, results, fields) => {
            if(error){
                console.log(error)
                return res.status(500).json({ message : "Something happened, Unable to execute the query"})
            }else{
                console.log(results)
                let filedArr = []
                results.forEach(element => {
                    
                    if(element.Field !== 'id' && element.Field !== 'courseName'){
                        console.log(element.Field)
                        filedArr.push(element.Field)
                    }
                });
                let result = {
                    "feeheads":filedArr
                }
                return res.status(200).json(result)
            }
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({ message : "Something went wrong in the server"})
    }
})

// //api to get details of a particular subject
// router.get('/', (req, res) => {
//     const subjectName = req.query.subjectName
//     const query = `SELECT id,subjectId, subjectName, courseName, facultyId, subjectType from coll_subject where subjectName='${subjectName}'`
//     restUtils.executeQuery(query, res)
// })

// //api to get details of all the subject
// router.get('/subjects', (req, res) => {
//     const query = 'SELECT id, subjectId, subjectName, courseName, facultyId, subjectType from coll_subject'
//     restUtils.executeQuery(query, res)
// })

// //api to delete details of a particular subject
// router.delete('/:id', (req, res) => {
//     query = ''
//     const id = req.params.id
//     if(id == 'subjects'){
//         query = 'DELETE FROM coll_subject'
//     }else{
//         query = `DELETE FROM coll_subject WHERE id='${id}'`
//     }
//     restUtils.executeQuery(query, res)
// })

// //api to update details of a particular subject
// router.put('/:id', (req, res) => {
//     const id = req.params.id
//     const { subjectId, subjectName, courseName, facultyId, subjectType } = req.body
//     const query = `UPDATE coll_subject SET subjectId='${subjectId}',  subjectName='${subjectName}',
//     courseName='${courseName}', facultyId='${facultyId}', subjectType='${subjectType}' WHERE id='${id}'`
//     restUtils.executeQuery(query, res)
// })

module.exports = router