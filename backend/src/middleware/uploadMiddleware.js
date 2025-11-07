import multer from 'multer';
import path from 'path';
import fs  from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, '..', 'uploads');

if(!fs.existsSync(uploadDir)) {
    console.log(`Creating directory: ${uploadDir}`);
    fs.mkdirSync(uploadDir, { recursive:true});    
} else {
    console.log(`Upload directory found at: ${uploadDir}`);
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