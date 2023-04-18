import * as api from '../api/index';
import Cookies from "universal-cookie";
import jwt from 'jwt-decode';

export const signUp = async (signUpData: any) => {
    const cookies = new Cookies();
    try {
        const { data } = await api.signup(signUpData);
        const decoded: any = jwt(data.token);
        cookies.set('jwt', data.token, {expires: new Date(decoded.expires * 1000)});
    } catch (error: any) {
        console.log(error.message);
    }
};

export const signIn = async (signInData: any) => {
    const cookies = new Cookies();
    try {
        const { data } = await api.signin(signInData);
        const decoded: any = jwt(data.token);
        cookies.set('jwt', data.token, {expires: new Date(decoded.expires * 1000)});
    } catch (error: any) {
        console.log(error.message);
    }
};