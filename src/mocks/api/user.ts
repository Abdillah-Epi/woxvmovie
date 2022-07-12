import { rest } from 'msw';
import { hasOAuth } from './utils/hasOAuth';
import { usersDB } from '../database/user';

import { hasJWT } from './utils/hasJWT';

const url = process.env.VITE_API_URL;

export const getCurrentUserProfile = rest.get(`${url}/v1/api/app/me`, (req, res, ctx) => {
    const oauth = hasOAuth(req, res, ctx);
    if (!oauth.status) return oauth.res;
    const jwt = hasJWT(req, res, ctx);
    if (!jwt.status) return jwt.res;

    if (usersDB.length === 0) return res(ctx.status(404));

    return res(
        ctx.status(200),
        ctx.json({ success: true, id: usersDB[0].id, email: usersDB[0].email, genres: usersDB[0].genres })
    );
});
