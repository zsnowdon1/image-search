import { addImageToCloud, getImageProperties } from "../dao/google-cloud-dao.js";
import { uploadPhoto, addPhotoUser } from "../dao/photo-dao.js";
import { Photo, PhotoUser } from "../models/models.js";
import { dbPool } from '../index.js';

export const addPhoto = async (file: any, username: String) => {
    const photoUrl = await addImageToCloud(file);
    const properties = await getImageProperties(file.originalname);
    const photo: Photo = {
        bucketUrl: photoUrl,
        filename: file.originalname,
        uploadTime: new Date()
    };
    let connection = await dbPool.getConnection();
    await connection.beginTransaction();
    try {
        const dbFile = await uploadPhoto(photo, connection);
        const photoUser: PhotoUser = {
            username: username,
            photoId: dbFile.id
        };
        await addPhotoUser(photoUser, connection);
        connection.commit();
    } catch (e) {
        connection.rollback();
    }
    return properties;
}