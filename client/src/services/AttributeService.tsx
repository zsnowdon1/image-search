import * as api from '../api/index';
import { Attribute, Photo } from '../models/models';

export async function getAttributes(username: string): Promise<Array<Attribute>> {
    const result = await api.getAttributesByUser(username);
    console.log(result.data);
    return result.data.photos;
}