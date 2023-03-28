import { Storage } from '@google-cloud/storage';
import vision from '@google-cloud/vision';
import path from 'path';
import { format } from 'util';
import { fileURLToPath } from 'url';
import { dbPool } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadPhoto = (file: any) => {
    console.log("start connection");
    dbPool.getConnection()
        .then(connection => {
            connection.query("select * from image_data.user")
            .then(rows => {
                console.log(rows);
            });
        });
}