import { PoolConnection } from 'mariadb';
import { dbPool } from '../index.js';
import { Photo, PhotoUser } from '../models/models.js';

const photoInsertQuery = `INSERT INTO image_data.photo (bucket_url, filename, upload_time) VALUES (?, ?, ?)`;
const photoUserInsertQuery = `INSERT INTO image_data.photo_user VALUES (?, ?)`;
const getIDQuery = `SELECT LAST_INSERT_ID();`;


export const uploadPhoto = async (photo: Photo, connection: PoolConnection) => {
    try {
        await connection.query(photoInsertQuery, [photo.bucketUrl, photo.filename, photo.uploadTime]);
        await connection.query(getIDQuery).then(result => photo.id = result[0]['LAST_INSERT_ID()']);
        return photo;
    } catch (e) {

    }
}

export const addPhotoUser = async (photoUser: PhotoUser, connection: PoolConnection) => {
    try {
        await connection.query(photoUserInsertQuery, [photoUser.username, photoUser.photoId]);
    } catch (e) {
    }
}