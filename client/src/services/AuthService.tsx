import axios from 'axios';
import * as api from '../api/index';

export const signUp = async (signUpData: any) => {
    try {
        api.signup(signUpData);
    } catch (error: any) {
        console.log(error.message);
    }
}