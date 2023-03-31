import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

export const fetchPosts = () => API.get('/posts');
export const uploadPhoto = (newPost: any) => API.post('/', newPost); 
export const signin = (loginInfo: any) => API.post('auth/signin', loginInfo);
export const signup = (signUpData: any) => API.post('auth/signup', signUpData);