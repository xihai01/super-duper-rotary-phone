import { Router, Request, Response } from 'express';
import Axios, { AxiosResponse } from 'axios';
import data from '../../data/repos.json';
import { Repo } from '../models/Repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');

  let repositories: Repo[] = data ? data : [];
  // fetch repo data from github and aggregate with local repo data
  try {
    const apiRequest: AxiosResponse = await Axios.get(
      'https://api.github.com/users/silverorange/repos'
    );
    repositories = [...repositories, ...apiRequest.data];
  } catch (error) {
    repositories = [];
  }

  // only respond with repos where fork is set to false
  const response: Repo[] = [];
  repositories.forEach((repo) => {
    if (repo.fork === false) {
      response.push(repo);
    }
  });

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json(response);
});
