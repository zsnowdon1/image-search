import { LoginInfo } from "../models/models.js";
import { signup, signin } from "../services/auth-service.js";

export async function signUp(req, res) {
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

export async function signIn(req, res) {
    let signInInfo: LoginInfo = req.body;
    try {
        const result = await signin(signInInfo);
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