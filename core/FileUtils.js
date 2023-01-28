var fs = require('fs');
var qs = require('qs')

var path = require("path");



class FileUtils {

  static geFileNameToUpload (req, file) {
    // var query = require('url').parse(req.url,true).query;
    console.log(req.query.type)
    var query = req.query
    var reg_id  = query.id
    var type = query.type
    var dir_path = `./uploads/${reg_id}`
    console.log(file)
    console.log(file.mimetype)
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'  || file.mimetype == 'image/png'){
      console.log(type)
      if(type !== 'profile' && type !== 'caste' && type !== 'disability' && type !== 'bank' && type !== 'signature'){
        throw new Error('Unidentified upload type, not supported!!')
      }
      console.log("image type is jpeg")
      var file_name = `${reg_id}_${type}.png`
      console.log(file_name)
      console.log(dir_path)
      console.log(fs.existsSync(`${dir_path}/${file_name}`))
      if(fs.existsSync(`${dir_path}/${file_name}`) && type !== 'profile'){
        throw new Error('file exists, cannot override')
      }
      return file_name;
    }else if(file.mimetype == 'application/pdf')
    {
      if(type !== 'educationDetails'){
        throw new Error('pdf file type is not supported')
      }
      console.log("Pdf file type")
      return `${reg_id}_${type}.pdf`
    }
    else{
      throw new Error('unsupported file type')
    }
  }

  static createDirectory (dirPath) {
    if(!fs.existsSync(dirPath)){
      console.log("Directory does not exist, creating")
      fs.mkdirSync(dirPath, {recursive: true})
      console.log("Directory created")
    }
    console.log('Directory already exists')
  }

  static getFileContentType(type){
    if(type == 'profile' || type == 'caste' || type == 'disability' || type == 'bank' || type == 'signature'){
      return 'image/png';
    }
    else if(type == 'educationDetails'){
      return 'application/pdf';
    }
    else{
      throw new Error('Unable to reconize the upload type!!')
    }
  }

  static getUploadedFileName(reg_id, type){
    var extension = 'png'
    if(type == 'educationDetails'){
      extension = 'pdf'
    }
    var fileDir = './uploads/'+ `${reg_id}`
    var fileName = fileDir+`/${reg_id}_${type}.${extension}`
    console.log(`Retrieving file name ${fileName}`)
    return fileName
  }

  static getAbsolutePath(relativePath){
    return path.resolve(relativePath);
  }
}



module.exports = FileUtils;