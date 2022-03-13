import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ErrorResponse } from "../error";
import { AccessTokenAtom, RefreshSelector, RefreshTokenAtom, routeStatusAtom } from "../store/auth";
import { UserAtom, UserSelector } from "../store/user";
import useAuthorization from "./useAuthorization";

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
    const { setOAuth } = useAuthorization();
    const setAccessToken = useSetRecoilState(AccessTokenAtom);
    const setRefreshToken = useSetRecoilState(RefreshTokenAtom);
    const setUser = useSetRecoilState(UserAtom);
    const setStatus = useSetRecoilState(routeStatusAtom);

    const newToken = useRecoilValue(RefreshSelector);
    const userData = useRecoilValue(UserSelector);

    useEffect(() => {
        if (typeof userData === "number") {
            setOAuth(() => null);
            setStatus(() => "public");
            return;
        }
        if (!userData) {
            setStatus(() => "public");
            return;
        }
        if (!userData.success) {
            setAccessToken(() => null);
            setRefreshToken(() => null);
            setUser(() => null);
            setStatus(() => "public");
            return;
        }
        setUser(userData);
        setStatus(() => "success");
    }, [userData]);

    useEffect(() => {
        if (!newToken || newToken == 403 || !newToken.success) return;
        setAccessToken(newToken.access_token);
        setRefreshToken(newToken.refresh_token);
    }, [newToken]);

    return { setUser, setAccessToken, setOAuth };
};

export default useAutoAuth;
