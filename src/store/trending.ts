import { selectorFamily } from 'recoil';
import { ErrorAccess } from '../error';
import { GetTopTrending } from '../requests/trending';
import { AccessTokenAtom } from './auth';
import { OAuthAtom } from './authorization';
import { TVMovieResponse } from './types';

export const TopsTrendingSelectorFamily = selectorFamily<
    TVMovieResponse | ErrorAccess.FORBIDDEN | ErrorAccess.UNAUTHORIZED,
    'trainding' | 'top/tv'
>({
    key: 'TopsTrendingSelectorFamily',
    get:
        path =>
        async ({ get }) => {
            const oauth_token = get(OAuthAtom);
            const access_token = get(AccessTokenAtom);

            if (!oauth_token) return ErrorAccess.FORBIDDEN;
            if (!access_token) return ErrorAccess.UNAUTHORIZED;

            const res = await GetTopTrending(path, access_token, oauth_token);
            return res;
        }
});
