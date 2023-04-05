import { PoolConnection } from 'mariadb';
import { dbPool } from '../index.js';
import { Attribute, Photo, PhotoUser } from '../models/models.js';

const photoInsertQuery = `INSERT INTO image_data.photo (bucket_url, filename, upload_time) VALUES (?, ?, ?)`;
const photoUserInsertQuery = `INSERT INTO image_data.photo_user VALUES (?, ?)`;
const attributeInsertQuery = `INSERT INTO image_data.attribute (name, score, photo_id) VALUES (?, ?, ?)`;
const getPhotosByUsernameQuery = `SELECT id, bucket_url, filename, upload_time FROM image_data.photo AS t1 INNER JOIN image_data.photo_user AS t2 ON t1.id = t2.photo_id WHERE t2.username = ?`;


export async function uploadPhoto(photo: Photo, connection: PoolConnection): Promise<Photo> {
    await connection.query(photoInsertQuery, [photo.bucketUrl, photo.filename, photo.uploadTime])
        .then(result => photo.id = Number(result.insertId));
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

export async function getPhotosByUser(username: String): Promise<Photo[]> {
    let connection = await dbPool.getConnection();
    const result: Photo[] = await connection.query(getPhotosByUsernameQuery, [username])
        .then(result => result.map((photo): Photo => {
            return {id: photo.id, bucketUrl: photo.bucket_url, filename: photo.filename, uploadTime: photo.upload_time};
        }));
    return result;
}