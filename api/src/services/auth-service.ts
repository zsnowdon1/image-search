import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../dao/user-dao.js';
import { User } from '../models/models.js';

export const signup = async (user: User) => {
    const existingUser = await getUserByUsername(user.username);
    if(existingUser) {
        console.log(existingUser);
    } else {
        console.log("NOT FOUND");
    }
}