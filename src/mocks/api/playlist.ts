import { rest } from 'msw';
import { hasOAuth } from './utils/hasOAuth';
import { hasJWT } from './utils/hasJWT';
import { TVMovie } from '../../store/types';
import { AddPlaylist, CreatePlaylist, DeletePlaylist, GetPlaylistById } from '../database/user';
import { v4 as uuid } from 'uuid';

const url = process.env.VITE_API_URL;

export const addInPlaylist = rest.put(`${url}/v1/api/app/playlists/add/:id`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    const { id } = req.params as { id: string };
    const { movies, on } = req.body as { movies: TVMovie; on: 'movie' | 'tv' | 'top-tv' | 'top-movie' | 'suggestion' };

    const m = AddPlaylist(movies, on, id);
    return res(ctx.status(200), ctx.json({ success: true, movies: m }));
});

export const createPlaylist = rest.post(`${url}/v1/api/app/playlist`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    const { name } = req.body as { name: string };

    const id = CreatePlaylist(uuid(), name);
    return res(ctx.status(200), ctx.json({ success: true, id: id }));
});

export const deletePlaylist = rest.delete(`${url}/v1/api/app/playlist/:id`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    const { id } = req.params as { id: string };

    DeletePlaylist(id);
    return res(ctx.status(200), ctx.json({ success: true }));
});

export const getPlaylistById = rest.get(`${url}/v1/api/app/playlists/movies/:id`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    const { id } = req.params as { id: string };

    const movies = GetPlaylistById(id);
    return res(ctx.status(200), ctx.json({ success: true, movies: movies?.data ?? [] }));
});
