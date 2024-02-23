import { Router } from 'express';
import authController from './auth.controller'

const router = Router();

router.post('/login', authController.doLogin);
router.post('/signup', authController.doSignup);

export default router;