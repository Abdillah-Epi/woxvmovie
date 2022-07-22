import { useNavigate } from '@tanstack/react-location';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import { LocationGenerics } from '../router';
import { AccessTokenAtom, RefreshSelector, RefreshTokenAtom, routeStatusAtom } from '../store/auth';
import { UserAtom, UserSelector } from '../store/user';
import useAuthorization from './useAuthorization';

export interface SignupParams {
    email: string;
    password: string;
}

export interface AuthSuccess {
    access_token: string;
    refresh_token: string;
    success: true;
}

export type AuthResponse = AuthSuccess | ErrorResponse | 403;

const useAutoAuth = () => {
    const { setOAuth, token } = useAuthorization();
    const setAccessToken = useSetRecoilState(AccessTokenAtom);
    const setRefreshToken = useSetRecoilState(RefreshTokenAtom);
    const setUser = useSetRecoilState(UserAtom);
    const setStatus = useSetRecoilState(routeStatusAtom);

    //const newToken = useRecoilValue(RefreshSelector);
    const userData = useRecoilValue(UserSelector);
    const navigate = useNavigate<LocationGenerics>();

    useEffect(() => {
        setStatus(() => 'public');
        if (userData === ErrorAccess.FORBIDDEN) return;
        if (userData === ErrorAccess.UNAUTHORIZED) return;

        setUser(userData);
        if (userData.genres.length === 0) {
            setStatus(() => 'genres');
            navigate({ to: '/app/genres' });
            return;
        }
        setStatus(() => 'success');
    }, [userData, token]);

    // useEffect(() => {
    //     if (newToken === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
    //     if (newToken === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
    //     if (newToken === ErrorAccess.REFRESH_TOKEN_EXPIRE) return setAccessToken(() => null);
    //     if (!newToken || !newToken.success) return setAccessToken(() => null);

    //     setRefreshToken(newToken.refresh_token);
    // }, [newToken]);

    return { setUser, setAccessToken, setOAuth };
};

export default useAutoAuth;
