import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {

    async postRegister(req: Request, res: Response) {
        try {
            const user = await authService.register(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error
                        ? error.message
                        : 'Error'
            });
        }
    }

    async postLogin(req: Request, res: Response) {
        try {
            const result = await authService.login(req.body);
            return res.json(result);
        } catch (error) {
            return res.status(401).json({
                message: error instanceof Error
                        ? error.message
                        : 'Error'
            });
        }
    }
}