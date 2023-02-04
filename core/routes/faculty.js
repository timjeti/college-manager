const express = require("express")

const router = express.Router()

var restUtils = require('./RestUtils.js')

//api to add a new faculty
router.post("/", (req,res) =>{
    const { facultyId, firstName, middleName, lastName, facultyPhone, facultyEmail } = req.body
    query = `INSERT INTO coll_faculty (facultyId, firstName, middleName, lastName, facultyPhone, facultyEmail) 
    VALUES ('${facultyId}', '${firstName}', '${middleName}', '${lastName}', '${facultyPhone}', '${facultyEmail}')`
    return restUtils.executeCommitQuery(query, res)
})

//api to get details of a particular faculty
router.get('/', (req, res) => {
    const facultyId = req.query.facultyId
    const query = `SELECT * from coll_faculty where facultyId='${facultyId}'`
    restUtils.executeQuery(query, res)
})

//api to get details of all the faculty
router.get('/faculties', (req, res) => {
    const query = 'SELECT * from coll_faculty'
    restUtils.executeQuery(query, res)
})

//api to delete details of a particular faculty
router.delete('/:id', (req, res) => {
    query = ''
    const id = req.params.id
    if(id == 'faculties'){
        query = 'DELETE FROM coll_faculty'
    }else{
        query = `DELETE FROM coll_faculty WHERE id='${id}'`
    }
    restUtils.executeQuery(query, res)
})

//api to update details of a particular faculty
router.put('/:id', (req, res) => {
    const id = req.params.id
    const { facultyId, firstName, middleName, lastName, facultyPhone, facultyEmail } = req.body
    const query = `UPDATE coll_faculty SET facultyId='${facultyId}',  firstName='${firstName}',
    middleName='${middleName}', lastName='${lastName}', facultyPhone='${facultyPhone}', facultyEmail='${facultyEmail}' WHERE id='${id}'`
    restUtils.executeQuery(query, res)
})

module.exports = router