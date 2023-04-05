import * as api from '../api/index';

export const signUp = async (signUpData: any) => {
    try {
        api.signup(signUpData);
    } catch (error: any) {
        console.log(error.message);
    }
}

export const signIn = async (signInData: any) => {
    try {
        const { data } = await api.signin(signInData);
    } catch (error: any) {
        console.log(error.message);
    }
}