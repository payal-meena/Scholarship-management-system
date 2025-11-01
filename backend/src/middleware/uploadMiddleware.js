import multer from 'multer';
import path from 'path';
import fd from 'fs';
import { application } from 'express';

const uploadDir = path.resolve('uploads');

if(!fstat.existSync(uploadDir)) {
    fstat.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const userId = req.user.id;
        const ext = path.extname(file.originalname);
        cb(null, `${userId}-${Date.now()}-${file.fieldname}${ext}`);
    }
});

const applicationUploads = multer({ storage}).fields([
    { name: 'photoFile', maxCount: 1 },
    { name: 'aadharFile', maxCount: 1 },
    { name: 'bankPassbookFile', maxCount: 1 },
    { name: 'casteCertificateFile', maxCount: 1 },
    { name: 'domicileCertificateFile', maxCount: 1 },
    { name: 'tenthMarksheetFile', maxCount: 1 },
    { name: 'twelveMarksheetFile', maxCount: 1 },
    { name: 'incomeCertificateFile', maxCount: 1 },
    { name: 'lastYearMarksheetFile', maxCount: 1 },
]);

export default applicationUploads;