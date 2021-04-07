import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';


interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
}

class CreateUserAuthenticate {
    public async execute({ email,password }: Request): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {email},
        });

        if (!user) {
            throw new Error('Email/Password is incorrect');
        }

        const checkPasswordMatch = await compare(password, user.password);

        if(!checkPasswordMatch) {
            throw new Error('Email/Password is incorrect');
        }

        return { 
            user,
        }

    }   
}


export default CreateUserAuthenticate;