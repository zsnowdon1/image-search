import express from 'express';
import mariadb from 'mariadb';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

import photoRoutes from './routes/photo-routes.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const db = mariadb.createConnection({
//     host: 'localhost',
//     user: 'user',
//     password: 'password',
//     database: 'image_search_database'
// })

const googleCloud = new Storage({
    keyFilename: path.join(__dirname, '../../secrets/rising-apricot-380619-075a8b342646.json'),
    projectId: 'rising-apricot-380619'
});

export const photoBucket = googleCloud.bucket('zsnowdon_app_bucket');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
export const upload = multer({storage: storage});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/photo', photoRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT);