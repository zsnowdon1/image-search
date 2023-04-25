import path from 'path';
import { fileURLToPath } from 'url';
import { dbPool } from '../index.js';
import { User } from '../models/models.js';

const getUserQuery = `SELECT * FROM image_data.user WHERE username=?`;
const createUserQuery = `INSERT INTO image_data.user VALUES (?, ?)`;


export async function getUserByUsername(username: string): Promise<User> {
    let connection = await dbPool.getConnection();
    let user : User;
    await connection.query(getUserQuery, [username]).then(result => user = result[0]);
    connection.end();
    return user;
};

export const createUser = async (user: User) => {
    let connection = await dbPool.getConnection();
    await connection.query(createUserQuery, [user.username, user.password]);
    connection.end();
};