import { Router, Request, Response } from 'express';
import Axios from 'axios';
import { Repo } from '../models/Repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');

  let response: Repo[] = [];
  try {
    const apiResponse = await Axios.get(
      'https://api.github.com/users/silverorange/repos'
    );
    response = apiResponse.data;
  } catch (error) {
    response = [];
  }

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json(response);
});
