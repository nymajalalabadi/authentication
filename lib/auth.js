import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
    var hashedPassword = await hash(password, 12);
    return hashedPassword;
}