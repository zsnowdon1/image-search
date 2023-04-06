import { addPhoto, getPhotosByUsername, addUserRoleToPhoto } from "../services/photo-service.js";
import multer from 'multer';
import path from "path";

const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
export const upload = multer({storage: storage});

export async function uploadPhoto(req, res) {
    try {
        const result = await addPhoto(req.file, req.body['username']);
        res.status(result.code).json({ photo: result.photo, attributes: result.attributes });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
};

export async function getPhotosByUser(req, res) {
    try {
        const result = await getPhotosByUsername(req.query['username']);
        res.status(result.code).json({ photos: result.photos });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
};

export async function addUserToPhoto(req, res) {
    try {
        const result = await addUserRoleToPhoto(req.body);
        res.status(result.code).json({ userRole: result.user });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
}