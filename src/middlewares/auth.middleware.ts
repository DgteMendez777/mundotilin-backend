import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Token Requerido"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token Requerido"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

        req.user = {id: decoded.userId, role: decoded.role};

        next();
    } catch {
        return res.status(401).json({
            message: "Token Invalido"
        })
    }
}