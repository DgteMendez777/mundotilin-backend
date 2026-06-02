import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const router = Router();
const constroller = new UsersController();

router.get('/', constroller.getUsers);

export default router;