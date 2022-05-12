import express from 'express';
import type { Request, Response } from 'express';
import bodyParser from 'body-parser';
// import axios from 'axios';

import Api from './api/Api';
import devConfig from './devConfig';
import initUsersRouter from './routes/usersRoute';
import initArticlesRouter from './routes/articlesRoute';

const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 3000;
const api = new Api(devConfig);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (_req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use('/users', initUsersRouter(api));
app.use('/articles', initArticlesRouter(api));

app.listen(port, host);
