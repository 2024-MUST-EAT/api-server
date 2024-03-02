import { User, UserData } from './auth';

let userId = 1;
const userRepository: User[] = [];


export class AuthRepository {
    findByEmail = async(email: string): Promise<User> => {


        try {
            const user: User | undefined = userRepository.find(user => user.email = email);
    
            if(!user) {
                throw new Error('Not found User');
            }
        return user;
        } catch ( error ) {
            throw error;
        }
    }

    registNewUser = async (userData: UserData): Promise<User> => {
        const { email, password} = userData;
    
    
        try {
            const user: User = {id: userId, email: email, password: password };
            userRepository.push(user);
            userId++;
    
            return user;
        } catch( error ) {
            throw error
        }
        
    }
}