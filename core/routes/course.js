const express = require("express")

const router = express.Router()

const { connection } = require('../Connection.js')

var restUtils = require('./RestUtils.js')



//api to create a new course
router.post("/", (req,res) =>{

    const { courseId, courseName, courseType } = req.body
    query = `INSERT INTO coll_course (courseId, courseName, courseType) VALUES ('${courseId}', '${courseName}','${courseType}')`
    restUtils.executeCommitQuery(query, res)
})

//api to get details of a particular course
router.get('/', (req, res) => {
    const courseName = req.query.courseName
    const query = `SELECT courseId, courseName, courseType from coll_course where courseName='${courseName}'`
    restUtils.executeQuery(query, res)
})

//api to update details of a particular course
router.put('/:id', (req, res) => {
    console.log("put data")
    const id = req.params.id
    const { courseId, courseName, courseType } = req.body
    const query = `UPDATE coll_course SET courseId='${courseId}', courseName='${courseName}', courseType='${courseType}' WHERE id='${id}'`
    restUtils.executeQuery(query, res)
})

//api to get details of all the courses
router.get('/courses', (req, res) => {
    const courseType = req.query.courseType
    query = 'SELECT * from coll_course'
    if( courseType !== undefined ){
        query = `SELECT * FROM coll_course WHERE courseType='${courseType}'`
    }
    restUtils.executeQuery(query, res)
})

//api to delete details of a particular course
router.delete('/:id', (req, res) => {
    query = ''
    const id = req.params.id
    if(id == 'courses'){
        query = 'DELETE FROM coll_course'
    }else{
        query = `DELETE FROM coll_course WHERE id='${id}'`
    }
    return restUtils.executeQuery(query, res)
})

//Get alll subjects for a given course
//Examp: http://localhost:3000/course/MCA/subjects?subjectType=elec
router.get('/:courseName/subjects', (req,res) => {
    courseName = req.params.courseName
    subjectType= req.query.subjectType
    query = ''
    query = `SELECT subjectName from coll_subject where courseName = '${courseName}'`
    if( subjectType !== undefined ){
        query = `SELECT subjectName FROM coll_subject WHERE courseName = '${courseName}' AND subjectType='${subjectType}'` 
    }
    return restUtils.executeQuery(query, res)
})

module.exports = router