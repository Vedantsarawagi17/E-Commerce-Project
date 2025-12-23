import multer from "multer";

// Without Multer, Express cannot understand file uploads; it only understands plain text and JSON.
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
 
export const upload = multer({ storage });