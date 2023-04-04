import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

export const fetchPosts = () => API.get('/posts');
export const uploadPhoto = (newPost: FormData) => API.post('photo', newPost); 
export const signin = (signInInfo: any) => API.post('auth/signin', signInInfo);
export const signup = (signUpData: any) => API.post('auth/signup', signUpData);