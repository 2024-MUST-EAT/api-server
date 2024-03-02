import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

const authService = new AuthService(new AuthRepository());
const authController = new AuthController(authService);

const router = Router();

router.post('/login', authController.doLogin);
router.post('/signup', authController.doSignup);

export default router;