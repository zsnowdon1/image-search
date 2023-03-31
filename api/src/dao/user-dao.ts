import path from 'path';
import { fileURLToPath } from 'url';
import { dbPool } from '../index.js';
import { User } from '../models/models.js';

const getUserQuery = `SELECT * FROM image_data.user WHERE username=?`;


export const getUserByUsername = async (username: String): Promise<User> => {
    let connection = await dbPool.getConnection();
    let user : User;
    await connection.query(getUserQuery, [username]).then(result => user = result[0]);
    return user;
}