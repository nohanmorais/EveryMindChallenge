import { Router } from 'express';

import CreateUserAuthenticate from '../service/CreateUserAuthenticate';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {

    try {

        const { email, password } = request.body;

        const userAuth = new CreateUserAuthenticate();

        const { user } = await userAuth.execute({
            email,
            password,
        });

        return response.json({message: 'Você está autorizado a entrar no sistema'});
        

       
   }catch(err) {
       return response.status(400).json({ error: err.message })
   }
});


export default sessionRouter;