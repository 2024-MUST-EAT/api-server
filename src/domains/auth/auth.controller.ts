import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { User } from './auth';

let userId = 1;
const userRepository: User[] = [];


export const doLogin = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const user: User | undefined = userRepository.find(user => user.email = email);

    if(!user) {
        return new Error('Not Found User');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if( !isMatch ) {
        return new Error('Invalid User Information') // 유저 비밀번호 오류 처리 필요
    }

    // Type Error 수정 필요
    req.session.isLoggedIn = true;
    req.session.user = user;

    req.session.save((err) => {
        // 세션 저장 오류 처리 필요
        console.log(err);
    });

    console.log(req.session);

    res.status(200).json({message: 'Login Success', id: user.id});


}

export const doSignup = async (req: Request, res: Response) => {

    // type safe를 위해 추후 validation 추가 예정
    const email: string = req.body.email;
    const password: string = req.body.password;

    const hashPassword = await bcrypt.hash(password, 12);

    const user: User = {id: userId, email: email, password: hashPassword };
    userRepository.push(user);
    userId++;

    res.status(201).json({id: user.id, email: email});

}