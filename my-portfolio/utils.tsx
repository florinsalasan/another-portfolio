import { Endpoints } from '@octokit/types';

export const GITHUB_BASE_URL = 'https://api.github.com'

type listUserReposResponse = 
    Endpoints['GET /users/{username}/repos']['response']
type listUserReposParams = 
    Endpoints['GET /users/{username}/repos']['parameters']

