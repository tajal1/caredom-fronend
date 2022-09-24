import multer from "multer";
import path from 'path';
import fs from 'fs';

// storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

module.exports = storage;

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000000
    }
})

// module.exports = upload;