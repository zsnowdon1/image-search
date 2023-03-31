import axios from 'axios'
const BASE_URL = 'http://localhost:8080/auth';

export async function uploadPhoto(photo: any) {
    console.log(photo);
    const formData = new FormData();
    formData.append('image', photo);
    const response = await axios({
        method: "post",
        url: BASE_URL,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
    return await response;
}