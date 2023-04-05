import { addPhoto } from "../services/photo-service.js";
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
        res.status(409).json({ message: error.message });
    }
};