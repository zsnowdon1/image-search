import { addImageToCloud, getImageProperties } from "../dao/google-cloud-dao.js";
import { uploadPhoto, addPhotoUser, addAttribute } from "../dao/photo-dao.js";
import { Attribute, AttributeDTO, Photo, PhotoUser } from "../models/models.js";
import { dbPool } from '../index.js';

export async function addPhoto(file: any, username: String) {
    const photoUrl = await addImageToCloud(file);
    var attributes: AttributeDTO[] = await getImageProperties(file.originalname);
    console.log(attributes);



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

        let attribute: Attribute = {
            name: "test",
            score: .76,
            photoId: dbFile.id
        };
        attribute = await addAttribute(attribute, connection);
        await connection.commit();
    } catch (e) {
        connection.rollback();
        return { code: 400, message: "Error in database transactions" };
    }
    return null;
}