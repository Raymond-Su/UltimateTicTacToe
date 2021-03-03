import express from 'express';
import scoresRouter from './scores';

const routes = express.Router();

routes.use('/scores', scoresRouter);

export { routes };
