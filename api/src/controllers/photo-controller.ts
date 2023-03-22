import { addPhoto } from "../services/photo-service.js";

export const uploadPhoto = (req, res) => {
    console.log(req.file.name);
    
    try {
        // await addPhoto(req.body);
        res.status(201).json(req);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};