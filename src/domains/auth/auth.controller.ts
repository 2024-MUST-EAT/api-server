import { Request, Response } from 'express';

import { UserData } from './auth';
import * as authService from './auth.service';


export const doLogin = async (req: Request, res: Response) => {
    const userData: UserData = req.body;

    const user = await authService.doLogin(userData);

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
    const userData: UserData = req.body;

    const user = await authService.doSignup(userData);

    res.status(201).json({id: user.id, email: user.email});

}