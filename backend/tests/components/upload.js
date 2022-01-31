const path = require("path");
const fs = require('fs');
const mime = require('mime-types'); //used to detect file's mime type
//import { join } from 'path'

module.exports = async (imgPath) => {
  // name of the file like image01.jpg
  const name = path.basename(imgPath);
  // set the full path of the uploads directory
  const uploadPath = process.cwd() + imgPath
  // read contents of file
  const buffer = await fs.statSync(uploadPath);
  return strapi.plugins.upload.services.upload.upload({
    data: {}, //mandatory declare the data(can be empty), otherwise it will give you an undefined error.
    files: {
		path: uploadPath, 
		name: name,
		type: mime.lookup(uploadPath), 
		size: buffer.size,
	},
   });
}; 