

class RestUtils{

    static getCourseDetails(query, connection, res){
        try{
            connection.query(query, (error, results, fields) => {
                if(error){
                    console.log(error)
                    return res.status(500).json({ message : "Something happened, Unable to get the courses"})
                }else{
                    return res.status(200).json(results)
                }
            })
        }catch(error){
            console.log(error)
            return res.status(500).json({ message : "Something happened, Unable to get the courses"})
        }
      }

      static deleteRow(query, connection, res){
        try{
            connection.query(query, (error, results, fields) => {
                if(error){
                    console.log(error)
                    return res.status(500).json({ message : "Something happened, Unable to delete the row"})
                }else{
                    return res.status(200).json(results)
                }
            })
        }catch(error){
            console.log(error)
            return res.status(500).json({ message : "Something happened, Unable to delete the row"})
        }
      }

}

module.exports = RestUtils