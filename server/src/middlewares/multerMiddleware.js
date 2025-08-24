import multer from 'multer'
import fs from 'fs'
import path from 'path'

const tempDir = path.join(process.cwd(), 'src', 'middlewares', 'tempFile');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Ensure the directory exists
        //console.dir(tempDir);
        fs.mkdirSync(tempDir, { recursive: true });
        cb(null, tempDir);
    },
    filename: function(req, file, cb) {
        const suffix = Date.now() + '-' + Math.floor(Math.random() * 9999);
        cb(null, file.fieldname + '-' + suffix);
    }
});

export const upload = multer({ storage });