import { Connection, PoolConnection } from 'mariadb';
import { dbPool } from '../index.js';
import { Attribute, AttributeDAO, Photo, PhotoUser } from '../models/models.js';
import { getImageFromCloud } from './google-cloud-dao.js';

const photoInsertQuery = `INSERT INTO image_data.photo (bucket_url, filename, unique_name, upload_time) VALUES (?, ?, ?, ?)`;
const photoUserInsertQuery = `INSERT INTO image_data.photo_user (username, photo_id, is_owner) VALUES (?, ?, ?)`;
const attributeInsertQuery = `INSERT INTO image_data.attribute (name, score, photo_id) VALUES (?, ?, ?)`;
const getPhotosByUsernameQuery = `SELECT id, bucket_url, filename, unique_name, upload_time FROM image_data.photo AS t1 INNER JOIN image_data.photo_user AS t2 ON t1.id = t2.photo_id WHERE t2.username = ?`;
const getPhotoQuery =  `SELECT id, bucket_url, filename, upload_time FROM image_data.photo where id = ?`;
const getAttributesByIdQuery = `SELECT id, name, score FROM image_data.attribute where photo_id = ?`;
const deletePhotoQuery = `DELETE FROM image_data.photo WHERE id = ?`;
const deletePhotoUserQuery = `DELETE FROM image_data.photo_user WHERE photo_id = ?`;
const deletePhotoAttributesQuery = `DELETE FROM image_data.attribute WHERE photo_id = ?`;
const getUniqueNameQuery = `SELECT unique_name FROM image_data.photo WHERE id = ?`;


export async function uploadPhoto(photo: Photo, connection: PoolConnection): Promise<Photo> {
    await connection.query(photoInsertQuery, [photo.bucketUrl, photo.filename, photo.uniqueName, photo.uploadTime])
        .then(async result => (
            photo.id = Number(result.insertId),
            photo.downloadUrl = await getImageFromCloud(photo.uniqueName)
        ))
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

export async function getPhotosByUser(username: string): Promise<Array<Photo>> {
    let connection = await dbPool.getConnection();
    const result: Array<Photo> = await connection.query(getPhotosByUsernameQuery, [username])
        .then(result => result.map((photo): Photo => {
            return {id: photo.id, bucketUrl: photo.bucket_url, filename: photo.filename, uniqueName: photo.unique_name, uploadTime: photo.upload_time};
        }))
        .catch(error => console.log(error));
    connection.end();
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
    connection.end();
    return result;
};

export async function deletePhotoUser(id: number, connection: Connection) {
    await connection.query(deletePhotoUserQuery, id).then(result => {
        console.log(result);
    });
};

export async function deletePhotoAttributes(id: number, connection: Connection) {
    await connection.query(deletePhotoAttributesQuery, id).then(result => {
        console.log(result);
    });
};

export async function deletePhotoDAO(id: number, connection: Connection) {
    await connection.query(deletePhotoQuery, id).then(result => {
        console.log(result);
    });
};

export async function getUniqueName(id: number, connection: Connection): Promise<string> {
    const uniqueName: string = await connection.query(getUniqueNameQuery, id).then(result => {
        return result[0].unique_name;
    });
    return uniqueName;
}