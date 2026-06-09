import jwt from 'jsonwebtoken';

export function generateToken(userId: string, role: string): string {
    return jwt.sign({userId, role}, process.env.JWT_SECRET as string, {expiresIn: '24h'});
}