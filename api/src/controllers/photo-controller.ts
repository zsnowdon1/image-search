import { addPhoto } from "../services/photo-service.js";

export const uploadPhoto = (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body))
    console.log(body);
    
    try {
        // await addPhoto(req.body);
        res.status(201).json(req);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};