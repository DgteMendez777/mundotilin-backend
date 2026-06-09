import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import { ROLES } from "../../../constants/roles";

const router = Router();
const constroller = new UsersController();

router.get('/', authMiddleware, roleMiddleware(ROLES.CLOWN), constroller.getUsers);

export default router;