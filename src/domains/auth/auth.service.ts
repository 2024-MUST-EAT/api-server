import bcrypt from 'bcrypt';

import { UserData, User } from './auth';
import { AuthRepository } from './auth.repository';

export class AuthService{
    constructor(private readonly authRepository: AuthRepository){}

    doLogin = async (userData: UserData): Promise<User> => {
        const { email, password } = userData;
    
    
        try{
            const user: User = await this.authRepository.findByEmail(email);
    
            const isMatch = await bcrypt.compare(password, user.password);
    
            if( !isMatch ) {
                throw new Error('Invalid User Information') // 유저 비밀번호 오류 처리 필요
            }
    
            return user;
        } catch( error ) {
    
            throw error;
        }
        
    }

    doSignup = async (userData: UserData): Promise<User> => {
        const { email, password } = userData;
    
    
        try {
            const existUser = await this.authRepository.findByEmail(email);
    
            if(existUser) {
                throw new Error('Already Exist User');
            }
    
            const hashPassword = await bcrypt.hash(password, 12);
            const user = await this.authRepository.registNewUser({email, password: hashPassword});
    
            return user
        } catch( error ) {
            throw error
        }
        
    }

}