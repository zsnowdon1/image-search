import { Attribute, AttributeDAO, Photo, PhotoDAO, PhotoUser } from "../models/models.js";
import { dbPool } from '../index.js';
import { getAttributesByUsername } from "../dao/attribute-dao.js";

export async function getAttributes(username: string) {
    try {
        const result: Array<AttributeDAO> = await getAttributesByUsername(username);
        return { code: 200, attributes: result };
    } catch (error) {
        return { code: 400, message: "Could not get photo" };
    }
}