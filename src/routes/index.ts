import { Router } from 'express';
import usersRouter from './users.routes';
import sessionRouter from './authenticate.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);


export default routes;