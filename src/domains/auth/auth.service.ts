import bcrypt from 'bcrypt';

import { UserData, User } from './auth';

let userId = 1;
const userRepository: User[] = [];

export const doLogin = async (userData: UserData): Promise<User> => {
    const { email, password } = userData;

    const user: User | undefined = userRepository.find(user => user.email = email);

    if(!user) {
        throw new Error('Not Found User');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if( !isMatch ) {
        throw new Error('Invalid User Information') // 유저 비밀번호 오류 처리 필요
    }

    return user;
}

export const doSignup = async (userData: UserData): Promise<User> => {
    const { email, password } = userData;

    const hashPassword = await bcrypt.hash(password, 12);

    const user: User = {id: userId, email: email, password: hashPassword };
    userRepository.push(user);
    userId++;

    return user;
}