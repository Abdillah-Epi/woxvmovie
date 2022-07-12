import { DefaultRequestMultipartBody, MockedRequest, RestHandler, setupWorker } from 'msw';
import * as Authentication from './api/auth';
import * as Movie from './api/movie';
import * as User from './api/user';
import * as Likes from './api/likes';
import * as Playlist from './api/playlist';
import * as Views from './api/views';

const handlers: RestHandler<MockedRequest<DefaultRequestMultipartBody>>[] = [
    ...Object.values(Authentication),
    ...Object.values(Movie),
    ...Object.values(User),
    ...Object.values(Playlist),
    ...Object.values(Likes),
    ...Object.values(Views)
];

const worker = setupWorker(...handlers);

export default worker;
