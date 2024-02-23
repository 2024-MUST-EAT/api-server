import { User, UserData } from './auth';

let userId = 1;
const userRepository: User[] = [];

export const findByEmail = async(email: string): Promise<User> => {

    const user: User | undefined = userRepository.find(user => user.email = email);

    if(!user) {
        throw new Error('Not found User');
    }


    return user;
}

export const registNewUser = async (userData: UserData): Promise<User> => {
    const { email, password} = userData;

    const user: User = {id: userId, email: email, password: password };
    userRepository.push(user);
    userId++;

    return user;
}