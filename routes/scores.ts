import express from 'express';
const scoresRouter = express.Router();

scoresRouter.get('/', (req, res, next) => {
  res.status(200).json({ item: 1 });
});

export default scoresRouter;
