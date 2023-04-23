import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

export const uploadPhoto = (newPost: FormData) => API.post('photo', newPost);
export const getPhotosByUsername = (username: string) => API.get('photo/user', {params: {username: username}});


export const signin = (signInInfo: any) => API.post('auth/signin', signInInfo);
export const signup = (signUpData: any) => API.post('auth/signup', signUpData);