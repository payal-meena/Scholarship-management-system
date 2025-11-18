import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.resolve('uploads/bulk');

if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive:true});
}

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, uploadDir);
    },
    filename: (req,file,cb) => {
        cb(null, `bulk-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const bulkUploadMiddleware = multer({
    storage: storage,
    fileFilter : (req,file,cb) => {
        if(file.mimetype.includes("csv") || file.mimetype.includes("excel")) {
            cb(null,true);
        } else {
            cb(null,false);
            return cb(new Error('Only CSV/Excel files are zllowed for bulk upload!'), false);
        }
    }
}).single('studentsDataFile');

export default bulkUploadMiddleware;
