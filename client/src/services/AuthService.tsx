import * as api from '../api/index';
import Cookies from "universal-cookie";
import jwt from 'jwt-decode';

export async function signUp(signUpData: any): Promise<string> {
    const cookies = new Cookies();
    const response = await  api.signup(signUpData);
    if(response.status !== 201) {
        return '';
    }
    const decoded: any = jwt(response.data.token);
    cookies.set('jwt', response.data.token, {expires: new Date(decoded.expires * 1000)});
    localStorage.setItem('user', decoded.username);
    return decoded.username;
};

export async function signIn(signInData: any): Promise<string> {
    const cookies = new Cookies();
    const response = await api.signin(signInData);
    if(response.status !== 200) {
        return '';
    }
    const decoded: any = jwt(response.data.token);
    cookies.set('jwt', response.data.token, {expires: new Date(decoded.expires * 1000)});
    localStorage.setItem('user', decoded.username);
    return decoded.username;
};