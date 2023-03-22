export const uploadPhoto = (req, res) => {
    console.log(req.photo);
    try {
        // await addPhoto(req.body);
        res.status(201).json(req);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
//# sourceMappingURL=photo-controller.js.map