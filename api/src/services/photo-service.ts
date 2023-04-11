import { addImageToCloud, getImageProperties } from "../dao/google-cloud-dao.js";
import { uploadPhoto, addPhotoUser, addAttributes, getPhotosByUser, getPhoto, getAttributesById } from "../dao/photo-dao.js";
import { Attribute, AttributeDAO, Photo, PhotoDAO, PhotoUser } from "../models/models.js";
import { dbPool } from '../index.js';

export async function addPhoto(file: any, username: String) {
    const photoUrl = await addImageToCloud(file);


    let photo: Photo = {
        bucketUrl: photoUrl,
        filename: file.originalname,
        uploadTime: new Date()
    };

    let connection = await dbPool.getConnection();
    await connection.beginTransaction();
    try {

        photo = await uploadPhoto(photo, connection);

        let attributes: Array<Attribute> = await getImageProperties(photo);

        const photoUser: PhotoUser = {
            username: username,
            photoId: photo.id,
            isOwner: true
        };
        await addPhotoUser(photoUser, connection);

        await addAttributes(attributes, connection);
        await connection.commit();
        return { code: 201, photo: photo, attributes: attributes };
    } catch (error) {
        connection.rollback();
        return { code: 400, message: "Error in database transactions" };
    }
};

export async function getPhotosByUsername(username: String) {
    try {
        const photos: Array<Photo> = await getPhotosByUser(username);
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
    try {
        let connection = await dbPool.getConnection();
        await addPhotoUser(photoUser, connection);
        connection.commit();
        return { code: 200, user: photoUser };
    } catch (error) {
        return { code: 400, message: "Could not add user to photo" };
    }
};