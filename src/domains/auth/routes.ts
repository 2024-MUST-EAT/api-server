import { Router } from 'express';
import * as authController from './auth.controller'

const router = Router();

router.post('/login', authController.doLogin);
router.post('/signup', authController.doSignup);

export default router;