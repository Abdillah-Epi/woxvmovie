import { AccessToken, OAuth, RefreshToken } from '../database/auth';
import { rest } from 'msw';
import { ShouldBindJSON } from './utils/bind_data';
import { hasOAuth } from './utils/hasOAuth';
import { UserAuth, usersDB } from '../database/user';
import { v4 as uuid } from 'uuid';

const url = process.env.VITE_API_URL;

const oauthToken = {
    access_token: OAuth,
    token_type: 'Bearer',
    expire_in: 7200
};

const authToken = {
    access_token: AccessToken,
    refresh_token: RefreshToken,
    success: true
};

export const getAuthorization = rest.post(`${url}/authorization`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ...oauthToken }));
});

export const signUp = rest.post(`${url}/v1/api/signup`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;

    const payload = await ShouldBindJSON<Pick<UserAuth, 'email' | 'password'>>(req, ctx, res, [
        'email:r|e|s',
        'password:r|s'
    ]);

    if (!payload) return;

    usersDB.push({ id: uuid(), email: payload.email, password: payload.password, genres: [] });
    return res(ctx.status(201), ctx.json({ ...authToken }));
});

export const signIn = rest.post(`${url}/v1/api/signin`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;

    const payload = await ShouldBindJSON<Pick<UserAuth, 'email' | 'password'>>(req, ctx, res, [
        'email:r|e|s',
        'password:r|s'
    ]);
    if (!payload) return;

    const user = usersDB.find(u => u.email === payload.email && u.password === payload.password);

    if (!user) return res(ctx.status(400));
    return res(ctx.status(200), ctx.json({ ...authToken }));
});

export const refresh = rest.post(`${url}/v1/api/refresh`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;

    const payload = await ShouldBindJSON<Pick<typeof authToken, 'refresh_token'>>(req, ctx, res, ['refresh_token:r|s']);

    if (!payload) return;

    return res(ctx.status(200), ctx.json({ ...authToken }));
});

export const logout = rest.post(`${process.env.VITE_API_URL}/v1/api/logout`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;

    return res(ctx.status(200), ctx.json({ success: true }));
});

export const deleteAccount = rest.delete(`${process.env.VITE_API_URL}/v1/api/app/account`, async (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;

    return res(ctx.status(200), ctx.json({ success: true }));
});

// `${url}/v1/api/app/me`
