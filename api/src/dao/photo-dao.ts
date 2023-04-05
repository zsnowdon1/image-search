import { PoolConnection } from 'mariadb';
import { Attribute, Photo, PhotoUser } from '../models/models.js';

const photoInsertQuery = `INSERT INTO image_data.photo (bucket_url, filename, upload_time) VALUES (?, ?, ?)`;
const photoUserInsertQuery = `INSERT INTO image_data.photo_user VALUES (?, ?)`;
const attributeInsertQuery = `INSERT INTO image_data.attribute (name, score, photo_id) VALUES (?, ?, ?)`;
const getIDQuery = `SELECT LAST_INSERT_ID();`;


export async function uploadPhoto(photo: Photo, connection: PoolConnection): Promise<Photo> {
    await connection.query(photoInsertQuery, [photo.bucketUrl, photo.filename, photo.uploadTime])
        .then(result => photo.id = Number(result.insertId));
    //await connection.query(getIDQuery).then(result => photo.id = result[0]['LAST_INSERT_ID()']);
    return photo;
};

export async function addPhotoUser(photoUser: PhotoUser, connection: PoolConnection) {
    await connection.query(photoUserInsertQuery, [photoUser.username, photoUser.photoId]);
};

export async function addAttributes(attributes: Attribute[], connection: PoolConnection) {
    await connection.batch(attributeInsertQuery, attributes.map(attribute => 
        [attribute.name, attribute.score, attribute.photoId]
    ));
};