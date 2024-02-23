import { Router } from 'express';
import bcrypt from 'bcrypt';

const router = Router();


let userId = 1;
const userTable: { [userId: number] : { email: string, password:string}} = {};

router.post('/login', (req, res) => {});
router.post('/signup', async (req, res) => {

    // type safe를 위해 추후 validation 추가 예정
    const email: string = req.body.email;
    const password: string = req.body.password;

    const hashPassword = await bcrypt.hash(password, 12);

    userTable[userId] = { email, password: hashPassword };
    userId++;

});

export default router;