import bcrypt from 'bcrypt';

import { UserData, User } from './auth';
import * as authRepository from './auth.repository';

export const doLogin = async (userData: UserData): Promise<User> => {
    const { email, password } = userData;

    const user: User = await authRepository.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if( !isMatch ) {
        throw new Error('Invalid User Information') // 유저 비밀번호 오류 처리 필요
    }

    return user;
}

export const doSignup = async (userData: UserData): Promise<User> => {
    const { email, password } = userData;

    const existUser = await authRepository.findByEmail(email);

    if(existUser) {
        throw new Error('Already Exist User');
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await authRepository.registNewUser({email, password: hashPassword});

    return user
}