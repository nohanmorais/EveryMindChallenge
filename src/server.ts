import express from 'express';
import routes from './routes';

import swaggerFile from './swagger.json';
import swaggerUI from 'swagger-ui-express';

import './database';

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(routes);

app.listen(3399, () => {
    console.log('Server Started on port 3399')
})