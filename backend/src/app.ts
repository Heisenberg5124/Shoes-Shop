import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';

const app = express();
app.use(cors());
app.use(json());

app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
