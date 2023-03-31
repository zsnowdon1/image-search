import { addPhoto } from "../services/photo-service.js";
import { SignUpInfo } from "../models/models.js";
import { signup } from "../services/auth-service.js";

export const signUp = async (req, res) => {
    try {
        let signUpInfo: SignUpInfo = req.body;
        await signup(signUpInfo);
        res.status(201).json("req");
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
};

export const signIn = async (req, res) => {
    try {
        console.log(req.body);
        await signup(req.body);
        res.status(201).json("req");
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
};