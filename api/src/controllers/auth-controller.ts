import { LoginInfo } from "../models/models.js";
import { signup, signin } from "../services/auth-service.js";

export const signUp = async (req, res) => {
    let signUpInfo: LoginInfo = req.body;
    try {
        const result = await signup(signUpInfo);
        if(result.code == 201) {
            return res.status(result.code).json({token: result.token});
        } else {
            return res.status(result.code).json({message: result.message});
        }
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
};

export const signIn = async (req, res) => {
    let signInInfo: LoginInfo = req.body;
    try {
        const result = await signin(signInInfo);
        console.log(result);
        if(result.code == 200) {
            return res.status(result.code).json({token: result.token});
        } else {
            return res.status(result.code).json({message: result.message});
        }
    } catch (error) {
        console.log(error.message);
        res.status(409).json({ message: error.message });
    }
};