const express = require("express")

const router = express.Router()

const { connection } = require('../Connection.js')

var restUtils = require('./RestUtils.js')



//api to create a new course
router.post("/", (req,res) =>{

    const { courseId, courseName } = req.body
    query = `INSERT INTO coll_course (course_id, course_name) VALUES ('${courseId}', '${courseName}')`
    try{
        connection.query(query, (error, results, fileds) =>{
            if(error){
                console.log(error)
                return res.status(500).json({ message : 'Something went wrong'})
            }else{
                return res.status(201).json({ message : 'Course succeessfully created'})
            }
    
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({ message : "Unable to create the course"})
    }
})

//api to get details of a particular course
router.get('/', (req, res) => {
    const courseName = req.query.courseName
    const query = `SELECT course_id, course_name from coll_course where course_name='${courseName}'`
    restUtils.getCourseDetails(query, connection, res)
})

//api to update details of a particular course
router.put('/:id', (req, res) => {
    console.log("put data")
    const id = req.params.id
    const courseName = req.query.courseName
    const courseId = req.query.courseId
    const query = `UPDATE coll_course SET course_id='${courseId}', course_name='${courseName}' WHERE id='${id}'`
    try{
        connection.query(query, (error, results, fields) => {
            if(error){
                console.log(error)
                return res.status(500).json({ message : "Something happened, Unable to get the courses"})
            }else{
                // query2 = `SELECT id, course_id, course_name from coll_course WHERE id='${id}'`
                // restUtils.getCourseDetails(query2, connection, res)
                return res.status(200).json(results)
            }
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({ message : "Something happened, Unable to get the courses"})
    }
})

//api to get details of all the courses
router.get('/courses', (req, res) => {
    const query = 'SELECT id, course_id, course_name from coll_course'
    restUtils.getCourseDetails(query, connection, res)
})

//api to update details of a particular course
router.delete('/:id', (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM coll_course WHERE id='${id}'`
    restUtils.deleteRow(query, connection, res)
})

module.exports = router