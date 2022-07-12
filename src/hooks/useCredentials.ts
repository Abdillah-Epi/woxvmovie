import React from 'react';
import { useRecoilState } from 'recoil';
import { AccessTokenAtom, RefreshTokenAtom } from '../store/auth';
import { OAuthAtom } from '../store/authorization';

const useCredentials = () => {
    const [oauth, setOAuth] = useRecoilState(OAuthAtom);
    const [accessToken, setAccessToken] = useRecoilState(AccessTokenAtom);
    const [refreshToken, setRefreshToken] = useRecoilState(RefreshTokenAtom);

    return { oauth, accessToken, refreshToken, setOAuth, setAccessToken, setRefreshToken };
};

export default useCredentials;
