import { addImageToCloud, getImageProperties } from "../dao/google-cloud-dao.js";
import { uploadPhoto, addPhotoUser, addAttributes, getPhotosByUser } from "../dao/photo-dao.js";
import { Attribute, Photo, PhotoUser } from "../models/models.js";
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

        let attributes: Attribute[] = await getImageProperties(photo);

        const photoUser: PhotoUser = {
            username: username,
            photoId: photo.id
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
        const photos: Photo[] = await getPhotosByUser(username);
        return { code: 200, photos: photos };
    } catch (error) {
        return { code: 400, message: "Could not receive photos" };
    }
};