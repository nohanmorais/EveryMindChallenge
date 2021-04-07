import { Router } from 'express';

import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {

   try { 
        const { name, cpf, adress, birthday, email, password} = request.body;   
        
        const createUser = new CreateUserService();

        const user = await createUser.execute({
           name,
           cpf,
           adress,
           birthday,
           email,
           password,
        })

        //@ts-ignore
        delete user.password;

        return response.json({ message: "Cadastro efetuado com sucesso!", user});
       
   }catch(err) {
       return response.status(400).json({ error: err.message })
   }
});


export default usersRouter;