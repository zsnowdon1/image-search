import { PoolConnection } from 'mariadb';
import { Attribute, Photo, PhotoUser } from '../models/models.js';

const photoInsertQuery = `INSERT INTO image_data.photo (bucket_url, filename, upload_time) VALUES (?, ?, ?)`;
const photoUserInsertQuery = `INSERT INTO image_data.photo_user VALUES (?, ?)`;
const attributeInsertQuery = `INSERT INTO image_data.attribute (name, score, photo_id) VALUES (?, ?, ?)`;
const getIDQuery = `SELECT LAST_INSERT_ID();`;


export const uploadPhoto = async (photo: Photo, connection: PoolConnection) => {
    try {
        await connection.query(photoInsertQuery, [photo.bucketUrl, photo.filename, photo.uploadTime]);
        await connection.query(getIDQuery).then(result => photo.id = result[0]['LAST_INSERT_ID()']);
        return photo;
    } catch (e) {

    }
};

export const addPhotoUser = async (photoUser: PhotoUser, connection: PoolConnection) => {
    try {
        await connection.query(photoUserInsertQuery, [photoUser.username, photoUser.photoId]);
    } catch (e) {
    }
};

export const addAttribute = async (attribute: Attribute, connection: PoolConnection) => {
    try {
        await connection.query(attributeInsertQuery, [attribute.name, attribute.score, attribute.photoId]);
        await connection.query(getIDQuery).then(result => attribute.id = result[0]['LAST_INSERT_ID()']);
        return attribute;
    } catch (e) {

    }
};