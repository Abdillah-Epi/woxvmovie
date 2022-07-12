import { rest } from 'msw';
import { hasOAuth } from './utils/hasOAuth';

import { hasJWT } from './utils/hasJWT';
import { Likes, UpdateLikes } from '../database/likes';
import { TVMovie } from '../../store/types';

const url = process.env.VITE_API_URL;

export const unLike = rest.put(`${url}/v1/api/app/unlike`, (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    const payload = req.body as TVMovie;
    const like = UpdateLikes(payload, 'unlike');
    return res(ctx.status(200), ctx.json({ success: true, movies: like }));
});

export const Like = rest.put(`${url}/v1/api/app/like`, (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    const payload = req.body as TVMovie;
    const like = UpdateLikes(payload, 'like');
    return res(ctx.status(200), ctx.json({ success: true, movies: like }));
});

export const getLikes = rest.get(`${url}/v1/api/app/favorites`, (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    return res(ctx.status(200), ctx.json({ success: true, movies: Likes }));
});
