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

export const uploadPhoto = async (req, res) => {
    try {
        console.log(req.file);
        await addPhoto(req.file);
        res.status(201).json("req");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};