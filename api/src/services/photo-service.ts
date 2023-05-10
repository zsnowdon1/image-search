import { addImageToCloud, getImageFromCloud, getImageProperties } from "../dao/google-cloud-dao.js";
import { uploadPhoto, addPhotoUser, addAttributes, getPhotosByUser, getPhoto, getAttributesById } from "../dao/photo-dao.js";
import { Attribute, AttributeDAO, Photo, PhotoDAO, PhotoUser } from "../models/models.js";
import { dbPool } from '../index.js';
import { randomUUID } from "crypto";

export async function addPhoto(file: any, username: string) {
    const uniqueName = file.originalname + "-" + randomUUID();
    file.uniqueName = uniqueName;
    const photoUrl = await addImageToCloud(file);

    let photo: Photo = {
        bucketUrl: photoUrl,
        filename: file.originalname,
        uniqueName: uniqueName,
        uploadTime: new Date()
    };

    let connection = await dbPool.getConnection();
    await connection.beginTransaction();
    try {

        photo = await uploadPhoto(photo, connection);
        const photoUser: PhotoUser = {
            username: username,
            photoId: photo.id,
            isOwner: true
        };

        let attributes: Array<Attribute> = await getImageProperties(photo);
        await addPhotoUser(photoUser, connection);

        await addAttributes(attributes, connection);

        await connection.commit();
        connection.end();
        return { code: 201, photo: photo, attributes: attributes };
    } catch (error) {
        connection.rollback();
        connection.end();
        return { code: 400, message: "Error in database transactions" };
    }
};

export async function getPhotosByUsername(username: string) {
    try {
        var photos: Array<Photo> = await getPhotosByUser(username);
        photos = await Promise.all(photos.map(async (photo): Promise<Photo> => ({
            id: photo.id,
            filename: photo.filename,
            uniqueName: photo.uniqueName,
            bucketUrl: photo.bucketUrl,
            uploadTime: photo.uploadTime,
            downloadUrl: await getImageFromCloud(photo.uniqueName)
        })));
        return { code: 200, photos: photos };
    } catch (error) {
        return { code: 400, message: "Could not receive photos" };
    }
};

export async function getPhotoById(id: number) {
    try {
        const photo: Photo = await getPhoto(id);
        const attribtues: Array<AttributeDAO> = await getAttributesById(id);
        return { code: 200, photo: photo, attribtues: attribtues };
    } catch (error) {
        return { code: 400, message: "Could not get photo" };
    }
};

export async function addUserRoleToPhoto(photoUser: PhotoUser) {
    let connection = await dbPool.getConnection();
    try {
        await addPhotoUser(photoUser, connection);
        connection.commit();
        connection.end();
        return { code: 200, user: photoUser };
    } catch (error) {
        connection.end();
        return { code: 400, message: "Could not add user to photo" };
    }
};