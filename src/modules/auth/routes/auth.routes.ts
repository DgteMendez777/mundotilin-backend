import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const controller = new AuthController();

router.post('/register', controller.postRegister);
router.post('/login', controller.postLogin);

export default router;