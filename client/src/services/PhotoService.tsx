import * as api from '../api/index';

export async function uploadPhoto(photo: any) {
    const formData = new FormData();
    formData.append('image', photo);
    formData.append('username', 'zsnowdon');
    const { data } = await api.uploadPhoto(formData);
    return await data;
}