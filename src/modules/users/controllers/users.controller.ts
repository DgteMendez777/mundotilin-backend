import { Request, Response } from "express";
import { UsersService } from "../services/users.service";

const UserService = new UsersService();

export class UsersController {
    async getUsers(req: Request, res: Response) {
        const users = await UserService.findAll();
        res.json(users);
    }
}