import { rest } from 'msw';
import { hasOAuth } from './utils/hasOAuth';
import { hasJWT } from './utils/hasJWT';
import { UpdateViews, Views } from '../database/views';
import { TVMovie } from '../../store/types';

const url = process.env.VITE_API_URL;

export const AddView = rest.put(`${url}/v1/api/app/views/add`, (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    const payload = req.body as { movies: TVMovie; on: string };
    UpdateViews({ ...payload.movies, on: payload.on });

    return res(ctx.status(200), ctx.json({ success: true }));
});

export const GetView = rest.get(`${url}/v1/api/app/views`, (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    return res(ctx.status(200), ctx.json({ success: true, movies: [...Views] }));
});
