import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByUsername, createUser } from '../dao/user-dao.js';
import { User } from '../models/models.js';

export async function signup(user: User) {
    const existingUser = await getUserByUsername(user.username);
    if(existingUser) {
        return { code: 400, message: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    await createUser(user);
    const token = jwt.sign( { username: user.username }, 'test', { expiresIn: "1hr" } );
    return { code: 201, token: token };
};

export async function signin (user: User) {
    const existingUser = await getUserByUsername(user.username);
    if(!existingUser) {
        return { code: 404, message: "User not found" };
    }
    const correctPassword = await bcrypt.compare(user.password, existingUser.password);
    if(!correctPassword) {
        return { code: 400, message: "Invalid password" };
    }
    const token = jwt.sign( { username: user.username }, 'test', { expiresIn: "1hr" } );
    return { code: 200, token: token };
}