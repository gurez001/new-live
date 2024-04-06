const fs = require('fs');
const path = require('path')
const multer = require('multer');

// Set up multer
// const distfolder = path.join(__dirname, "../../frontend/public/");

const uploadFolder = path.join(__dirname, '../uploads');

// Ensure that the upload folder exists, if not, create it
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder); // Specify the destination directory for uploaded files
    },
    filename: (req, file, cb) => {
    //    console.log(file)
        cb(null, Date.now() + '-' + file.originalname);// Use the original file name
    },
});
const upload = multer(
    { 
        storage: storage,
         limits: {
            fileSize: 1024 * 1024 * 5, // 5MB (adjust this size as needed)
        },
    }
    );

module.exports = upload;