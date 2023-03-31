import path from 'path';
import { fileURLToPath } from 'url';
import { dbPool } from '../index.js';
import { Photo } from '../models/models.js';

const photoInsertQuery = `INSERT INTO image_data.photo (bucket_url, filename, upload_time) VALUES (?, ?, ?)`;
const photoUserInsertQuery = `INSERT INTO image_data.photo_user VALUES (?, ?)`;
const getIDQuery = `SELECT LAST_INSERT_ID();`;


export const uploadPhoto = async (photo: Photo) => {
    let connection = await dbPool.getConnection();
    await connection.beginTransaction();

    try {
        await connection.batch(photoInsertQuery, [photo.bucketUrl, photo.filename, photo.uploadTime]);
        // await connection.batch(photoUserInsertQuery, [])
        await connection.query(getIDQuery).then(result => photo.id = result[0]['LAST_INSERT_ID()']);
        console.log(photo);
    } catch (e) {
        connection.rollback();
    }

}