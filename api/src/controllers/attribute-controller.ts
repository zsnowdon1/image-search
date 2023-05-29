import { addPhoto, getPhotosByUsername, addUserRoleToPhoto, getPhotoById, deletePhoto } from "../services/photo-service.js";
import { getAttributes } from "../services/attribute-service.js";
import multer from 'multer';
import path from "path";


export async function getAttributesByUser(req, res) {
    try {
        const result = await getAttributes(req.query['username']);
        res.status(result.code).json({ attributes: result.attributes });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
}