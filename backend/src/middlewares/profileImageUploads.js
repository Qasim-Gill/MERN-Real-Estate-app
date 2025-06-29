// profileImageUploads.js
import multer from 'multer';


// it was uploading files on my local machine, but I want to upload it on cloudinary
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     cb(null, uniqueName);
//   }
// });

const storage = multer.memoryStorage();

const profileImageUploads = multer({ storage });
export default profileImageUploads;

