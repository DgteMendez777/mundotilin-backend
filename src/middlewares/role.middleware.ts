import { Request, Response, NextFunction } from "express";

export function roleMiddleware(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Usuario no autenticado"
            });
        }

        const hasRole = allowedRoles.includes(req.user.role);

        if (!hasRole) {
            return res.status(403).json({
                message: "Acceso denegado"
            });
        }

        next();
    };
}