export const uploadPhoto = async (req, res) => {
    console.log(req.body);
    try {
        //await addPhoto(photo);
        res.status(201).json(req);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
//# sourceMappingURL=photo-controller.js.map