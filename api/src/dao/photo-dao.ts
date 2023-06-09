import { PoolConnection } from 'mariadb';
import { dbPool } from '../index.js';
import { Attribute, AttributeDAO, Photo, PhotoUser } from '../models/models.js';

const photoInsertQuery = `INSERT INTO image_data.photo (bucket_url, filename, upload_time) VALUES (?, ?, ?)`;
const photoUserInsertQuery = `INSERT INTO image_data.photo_user (username, photo_id, is_owner) VALUES (?, ?, ?)`;
const attributeInsertQuery = `INSERT INTO image_data.attribute (name, score, photo_id) VALUES (?, ?, ?)`;
const getPhotosByUsernameQuery = `SELECT id, bucket_url, filename, upload_time FROM image_data.photo AS t1 INNER JOIN image_data.photo_user AS t2 ON t1.id = t2.photo_id WHERE t2.username = ?`;
const getPhotoQuery =  `SELECT id, bucket_url, filename, upload_time FROM image_data.photo where id = ?`;
const getAttributesByIdQuery = `SELECT id, name, score FROM image_data.attribute where photo_id = ?`;


export async function uploadPhoto(photo: Photo, connection: PoolConnection): Promise<Photo> {
    await connection.query(photoInsertQuery, [photo.bucketUrl, photo.filename, photo.uploadTime])
        .then(result => photo.id = Number(result.insertId))
        .catch(error => console.log(error));
    return photo;
};

export async function getPhoto(id: number): Promise<Photo> {
    let connection = await dbPool.getConnection();
    const photo: Photo = await connection.query(getPhotoQuery, id)
        .then(photo => {
            return {id: photo[0].id, bucketUrl: photo[0].bucket_url, filename: photo[0].filename, uploadTime: photo[0].upload_time};
        })
        .catch(error => {
            console.log(error);
            return null;
        });
    return photo;
};

export async function addPhotoUser(photoUser: PhotoUser, connection: PoolConnection) {
    await connection.query(photoUserInsertQuery, [photoUser.username, photoUser.photoId, photoUser.isOwner])
        .catch(error => console.log(error));
};

export async function addAttributes(attributes: Array<Attribute>, connection: PoolConnection) {
    await connection.batch(attributeInsertQuery, attributes.map(attribute => 
        [attribute.name, attribute.score, attribute.photoId]
    ))
    .catch(error => console.log(error));
};

export async function getPhotosByUser(username: String): Promise<Array<Photo>> {
    let connection = await dbPool.getConnection();
    const result: Array<Photo> = await connection.query(getPhotosByUsernameQuery, [username])
        .then(result => result.map((photo): Photo => {
            return {id: photo.id, bucketUrl: photo.bucket_url, filename: photo.filename, uploadTime: photo.upload_time};
        }))
        .catch(error => console.log(error));
    return result;
};

export async function getAttributesById(id: number): Promise<Array<AttributeDAO>> {
    const connection = await dbPool.getConnection();
    const result: Array<AttributeDAO> = await connection.query(getAttributesByIdQuery, id).then(result => {
        return result.map((attribute): AttributeDAO => ({
            id: attribute.id,
            name: attribute.name,
            score: attribute.score
        }));
    });
    return result;
};