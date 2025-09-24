'use server';

import { sign } from 'jsonwebtoken';

export async function getJwtServerAction(secret: string) {
    const token = sign({ userId: 123, role: 'admin' }, secret);
    console.log('JWT Token:', token);
    return token;
}
