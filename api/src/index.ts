import express from 'express';
import mariadb from 'mariadb';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

app.use('/photo', photoRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT);