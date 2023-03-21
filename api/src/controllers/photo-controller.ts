import { addPhoto } from "../services/photo-service.js";

export const uploadPhoto = async (req, res) => {
    console.log(1);
    const photo = req.body;
    
    try {
        //await addPhoto(photo);
        res.status(201).json(req);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};