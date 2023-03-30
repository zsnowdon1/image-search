import { addImageToCloud, getImageProperties } from "../dao/google-cloud-dao.js";
import { uploadPhoto } from "../dao/photo-dao.js";
import { Photo } from "../models/photo-dto.js";

export const addPhoto = async (file) => {
    const photoUrl = await addImageToCloud(file);
    const properties = await getImageProperties(file.originalname);
    const photo: Photo = {
        bucketUrl: photoUrl,
        filename: file.originalname,
        uploadTime: new Date()
    };
    const dbFile = await uploadPhoto(photo);
    return properties;
}