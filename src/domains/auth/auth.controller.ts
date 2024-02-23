import { Request, Response } from 'express';

import { UserData } from './auth';
import * as authService from './auth.service';


export const doLogin = async (req: Request, res: Response) => {
    const userData: UserData = req.body;

    try {
        const user = await authService.doLogin(userData);

        // Type Error 수정 필요
        req.session.isLoggedIn = true;
        req.session.user = user;

        req.session.save();

        res.status(200).json({message: 'Login Success', id: user.id});
        return;
    } catch( error ) {
        res.status(500).json({message: 'Login Error'});
    }
    

}

export const doSignup = async (req: Request, res: Response) => {
    // type safe를 위해 추후 validation 추가 예정
    const userData: UserData = req.body;
    try {
    const user = await authService.doSignup(userData);

    res.status(201).json({id: user.id, email: user.email});
    return;
    } catch( error ) {
        res.status(500).json({message: 'Signup Error'});
    }
    

}