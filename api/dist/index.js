import express from 'express';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import photoRoutes from './routes/photo-routes.js';
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
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/photo', photoRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT);
//# sourceMappingURL=index.js.map