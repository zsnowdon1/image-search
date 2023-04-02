import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByUsername, createUser } from '../dao/user-dao.js';
import { User } from '../models/models.js';

export const signup = async (user: User) => {
    const existingUser = await getUserByUsername(user.username);
    if(existingUser) {
        return { code: 400, message: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    await createUser(user);
    const token = jwt.sign({username: user.username}, 'test', { expiresIn: "1hr" });
    return { code: 201, token: token };
}