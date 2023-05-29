import * as api from '../api/index';
import { Photo } from '../models/models';

export async function uploadPhoto(photo: any) {
    const formData = new FormData();
    formData.append('image', photo);
    formData.append('username', 'zsnowdon');
    const { data } = await api.uploadPhoto(formData);
    return data;
}

export async function getPhotosByUser(username: string): Promise<Array<Photo>> {
    const result = await api.getPhotosByUsername(username);
    return result.data.photos;
}

export async function downloadPhoto(photo: Photo) {
    
}

export async function deletePhoto(id: number) {
    const result = await api.deletePhoto(id);
    return result;
}