import { addImageToCloud, getImageProperties } from "../dao/google-cloud-dao.js";
import { uploadPhoto } from "../dao/photo-dao.js";

export const addPhoto = async (file) => {
    const cloudFile = await addImageToCloud(file);
    const properties = await getImageProperties(file.originalname);
    const dbFile = await uploadPhoto(file);
    return properties;
}