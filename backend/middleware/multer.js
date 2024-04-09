const path = require('path');
const multer = require('multer');

// Set up multer
const distfolder = path.join(__dirname, '../../frontend/public/');
const uploadFolder = path.join(distfolder, 'uploads'); // Define the uploads folder path

console.log('Upload folder:', uploadFolder); // Add logging to check the upload folder path

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the destination directory for uploaded files
    },
    filename: (req, file, cb) => {
        console.log('Uploaded file:', file); // Add logging to check the uploaded file object
        cb(null, Date.now() + '-' + file.originalname); // Use the original file name
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB (adjust this size as needed)
    },
}).single('avatar'); // Assuming 'avatar' is the name of your file input field

// Middleware to handle the upload process
const handleUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred (e.g., file size limit exceeded)
            console.error('Multer error:', err);
            return res.status(400).json({ error: 'Upload failed. Please try again.' });
        } else if (err) {
            // An unexpected error occurred during upload
            console.error('Unexpected error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // No error occurred, move to the next middleware or route handler
        next();
    });
};

module.exports = {
    upload,
    handleUpload,
};
