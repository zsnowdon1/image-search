import { SignUpInfo } from "../models/models.js";
import { signup } from "../services/auth-service.js";

export const signUp = async (req, res) => {
    try {
        let signUpInfo: SignUpInfo = req.body;
        const result = await signup(signUpInfo);
        if(result.code == 200) {
            return res.status(result.code).json(result.token);
        } else if(result.code == 400) {
            return res.status(result.code).json(result.message);
        }
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