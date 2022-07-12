import { selectorFamily } from 'recoil';
import { ErrorAccess } from '../error';
import { GetVideo } from '../requests/video';
import { AccessTokenAtom } from './auth';
import { OAuthAtom } from './authorization';
import { VideosResponse } from './types';
import { UserAtom } from './user';

export const VideoSelector = selectorFamily<
    VideosResponse | ErrorAccess.FORBIDDEN | ErrorAccess.UNAUTHORIZED,
    { id: number; on: string }
>({
    key: 'VideoSelector',
    get:
        ({ id, on }) =>
        async ({ get }) => {
            const oauth_token = get(OAuthAtom);
            const access_token = get(AccessTokenAtom);
            const user = get(UserAtom);

            if (!oauth_token) return ErrorAccess.FORBIDDEN;
            if (!access_token) return ErrorAccess.UNAUTHORIZED;
            if (!user) return ErrorAccess.UNAUTHORIZED;

            const res = await GetVideo(id, on, oauth_token, access_token);
            return res;
        }
});
