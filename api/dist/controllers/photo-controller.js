export const getPhotos = async (req, res) => {
    try {
        res.status(200).json("postMessages");
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const uploadPhoto = async (req, res) => {
    const post = req.body;
    try {
        // await newPost.save();
        res.status(201).json("newPost");
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
//# sourceMappingURL=photo-controller.js.map