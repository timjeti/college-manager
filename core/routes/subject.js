const express = require("express")

const router = express.Router()

var restUtils = require('./RestUtils.js')


//api to create a new subject
router.post("/", (req,res) =>{
    const { subjectId, subjectName, courseName, facultyId, subjectType } = req.body
    query = `INSERT INTO coll_subject (subjectId, subjectName, courseName, facultyId, subjectType) 
    VALUES ('${subjectId}', '${subjectName}', '${courseName}', '${facultyId}', '${subjectType}')`
    return restUtils.executeCommitQuery(query, res)
})

//api to get details of a particular subject
router.get('/', (req, res) => {
    const subjectName = req.query.subjectName
    const query = `SELECT id,subjectId, subjectName, courseName, facultyId, subjectType from coll_subject where subjectName='${subjectName}'`
    restUtils.executeQuery(query, res)
})

//api to get details of all the subject
router.get('/subjects', (req, res) => {
    const query = 'SELECT id, subjectId, subjectName, courseName, facultyId, subjectType from coll_subject'
    restUtils.executeQuery(query, res)
})

//api to delete details of a particular subject
router.delete('/:id', (req, res) => {
    query = ''
    const id = req.params.id
    if(id == 'subjects'){
        query = 'DELETE FROM coll_subject'
    }else{
        query = `DELETE FROM coll_subject WHERE id='${id}'`
    }
    restUtils.executeQuery(query, res)
})

//api to update details of a particular subject
router.put('/:id', (req, res) => {
    const id = req.params.id
    const { subjectId, subjectName, courseName, facultyId, subjectType } = req.body
    const query = `UPDATE coll_subject SET subjectId='${subjectId}',  subjectName='${subjectName}',
    courseName='${courseName}', facultyId='${facultyId}', subjectType='${subjectType}' WHERE id='${id}'`
    restUtils.executeQuery(query, res)
})

module.exports = router