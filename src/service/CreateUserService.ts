import User from '../models/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';


interface Request {
    name: string;
    cpf: string;
    adress: string;
    birthday: Date;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({name, cpf, adress, birthday, email, password}: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: {email},
        });

        if (checkUserExists) {
            throw new Error('email already exists');
        }

        const checkUserNameExists = await userRepository.findOne({
            where: { cpf },
        })

        if(checkUserNameExists) {
            throw new Error('User already exists');
        }

        const cryptPassword = await hash(password, 8);
        const formatedBrithday = new Date(Date.parse(birthday.toString()));

        const user = userRepository.create({
            name,
            cpf,
            adress,
            birthday: formatedBrithday,
            email,
            password: cryptPassword,
        });

        await userRepository.save(user);
        return user;
    }   
}


export default CreateUserService;