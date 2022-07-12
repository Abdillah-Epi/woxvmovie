import { rest } from 'msw';
import { hasOAuth } from './utils/hasOAuth';
import { hasJWT } from './utils/hasJWT';
import { Movie } from '../database/movies/movie';
import { usersDB } from '../database/user';
import { Trending } from '../database/movies/trending';
import { Comedy } from '../database/movies/comedy';
import { Animation } from '../database/movies/animation';
import { Crime } from '../database/movies/crime';
import { Action } from '../database/movies/action';

const url = process.env.VITE_API_URL;

export const getBanner = rest.get(`${url}/v1/api/app/video/:id/:on`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    return res(ctx.status(200), ctx.json({ ...Movie }));
});

export const updateGenres = rest.put(`${url}/v1/api/app/genres`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    usersDB[0].genres = ['Action & Adventure', 'Animation', 'Fantasy & Sci-Fi', 'Comedy'];
    return res(ctx.status(200), ctx.json({ success: true }));
});

export const getTrending = rest.get(`${url}/v1/api/app/trainding`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    return res(ctx.status(200), ctx.json({ ...Trending }));
});

export const getToTv = rest.get(`${url}/v1/api/app/top/tv`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    return res(ctx.status(200), ctx.json({ ...Trending }));
});

export const getMovie = rest.get(`${url}/v1/api/app/popular/:genre`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    const { path, genre } = req.params as { path: 'popular/tv' | 'popular'; genre: string };

    switch (genre) {
        case 'Comedy':
            return res(ctx.status(200), ctx.json({ success: true, movies: [...Comedy.movies] }));
        case 'Animation':
            return res(ctx.status(200), ctx.json({ success: true, movies: [...Animation.movies] }));
        case 'Crime':
            return res(ctx.status(200), ctx.json({ success: true, movies: [...Crime.movies] }));
        case 'Action':
            return res(ctx.status(200), ctx.json({ success: true, movies: [...Action.movies] }));
    }
    return res(ctx.status(404), ctx.json({ success: false }));
});

export const getSeries = rest.get(`${url}/v1/api/app/popular/tv/:genre`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    const { path, genre } = req.params as { path: 'popular/tv' | 'popular'; genre: string };

    switch (genre) {
        case 'Comedy':
            return res(ctx.status(200), ctx.json({ success: true, movies: [...Comedy.movies] }));
        case 'Animation':
            return res(ctx.status(200), ctx.json({ success: true, movies: [...Animation.movies] }));
        case 'Crime':
            return res(ctx.status(200), ctx.json({ success: true, movies: [...Crime.movies] }));
        case 'Action':
            return res(ctx.status(200), ctx.json({ success: true, movies: [...Action.movies] }));
    }
    return res(ctx.status(404), ctx.json({ success: false }));
});

export const UpdateUserGenres = rest.put(`${process.env.VITE_API_URL}/v1/api/app/genres`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    usersDB[1].genres = ['Action & Adventure', 'Animation', 'Fantasy & Sci-Fi', 'Comedy'];
    return res(ctx.status(200), ctx.json({ success: true }));
});
