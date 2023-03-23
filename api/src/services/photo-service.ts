import { addImageToCloud } from "../dao/google-cloud-dao.js";

export const addPhoto = async (file) => {
    const fileUrl = await addImageToCloud(file);
    console.log(fileUrl);
    return fileUrl;
}