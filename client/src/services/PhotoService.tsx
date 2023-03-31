import axios from 'axios'
const BASE_URL = 'http://localhost:8080/photo';

export async function uploadPhoto(photo: any) {
    const formData = new FormData();
    formData.append('image', photo);
    formData.append('userId', '1');
    const response = await axios({
        method: "post",
        url: BASE_URL + '/signup',
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
    return await response;
}