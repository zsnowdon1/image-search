import { addImageToCloud, getImageProperties } from "../dao/google-cloud-dao.js";

export const addPhoto = async (file) => {
    const cloudFile = await addImageToCloud(file);
    const properties = await getImageProperties(file.originalname);
    return properties;
}