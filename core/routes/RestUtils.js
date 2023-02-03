const { connection } = require('../Connection.js')

class RestUtils{

      static executeQuery(query, res){
        try{
            connection.query(query, (error, results, fields) => {
                if(error){
                    console.log(error)
                    return res.status(500).json({ message : "Something happened, Unable to execute the query"})
                }else{
                    return res.status(200).json(results)
                }
            })
        }catch(error){
            console.log(error)
            return res.status(500).json({ message : "Something went wrong in the server"})
        }
      }

      static executeCommitQuery(query, res){
        try{
            connection.query(query, (error, results, fields) => {
                if(error){
                    console.log(error)
                    return res.status(500).json({ message : "Something happened, Unable to execute the query"})
                }else{
                    return res.status(201).json({ message : 'Created Successfully'})
                }
            })
        }catch(error){
            console.log(error)
            return res.status(500).json({ message : "Something happened, Unable to execute the query"})
        }
      }

}

module.exports = RestUtils