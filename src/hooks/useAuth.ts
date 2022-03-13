import { useRecoilState, useSetRecoilState } from 'recoil';
import { ErrorResponse } from '../error';
import { AccessTokenAtom, CleanAuthSelector, RefreshTokenAtom, routeStatusAtom } from '../store/auth';
import { OAuthAtom } from '../store/authorization';
import { UserAtom } from '../store/user';

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

const useAuth = () => {
    const [oauth, setOAuth] = useRecoilState(OAuthAtom);
    const [accessToken, setAccessToken] = useRecoilState(AccessTokenAtom);
    const [refreshToken, setRefreshToken] = useRecoilState(RefreshTokenAtom);
    const [user, setUser] = useRecoilState(UserAtom);

    const signup = async (payload: SignupParams) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/signup`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${oauth}`
            },
            method: 'POST',
            body: JSON.stringify({
                ...payload
            })
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        return await res.json().then((r: AuthResponse) => {
            if (r !== 403 && r.success) {
                setAccessToken(r.access_token);
                setRefreshToken(r.refresh_token);
            }
            return r;
        });
    };

    const signupWithGoogle = async () => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/signup/google`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${oauth}`,
                'Access-Control-Allow-Origin': '*'
            },
            method: 'GET',
            redirect: 'follow'
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        return await res.json().then((r: { success: boolean; url: string }) => {
            window.location.href = r.url;
            return;
        });
    };

    const signinWithGoogle = async () => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/signin/google`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${oauth}`,
                'Access-Control-Allow-Origin': '*'
            },
            method: 'GET',
            redirect: 'follow'
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        return await res.json().then((r: { success: boolean; url: string }) => {
            window.location.href = r.url;
            return;
        });
    };

    const GetAccess = async (token: string, type: string) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/${type}/access/${token}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${oauth}`
            },
            method: 'GET'
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        return await res.json().then((r: AuthResponse) => {
            if (r !== 403 && r.success) {
                setAccessToken(r.access_token);
                setRefreshToken(r.refresh_token);
            }
            return r;
        });
    };

    const signin = async (email: string, password: string) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/signin`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${oauth}`
            },
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        return await res.json().then((r: AuthResponse) => {
            if (r !== 403 && r.success) {
                setAccessToken(r.access_token);
                setRefreshToken(r.refresh_token);
            }
            return r;
        });
    };

    const cleanAuthSession = useSetRecoilState(CleanAuthSelector);
    const setStatus = useSetRecoilState(routeStatusAtom);
    const logout = async () => {
        cleanAuthSession('');
        setStatus(() => 'public');
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/logout`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${oauth}`
            },
            method: 'POST'
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        if (res.status === 401) {
            setAccessToken(() => null);
            return 401;
        }
    };

    const deleteAccount = async () => {
        cleanAuthSession('');
        setStatus(() => 'public');
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/accout`, {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: `Bearer ${accessToken}`,
                Authorization: `Bearer ${oauth}`
            },
            method: 'DELETE'
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        if (res.status === 401) {
            setAccessToken(() => null);
            return 401;
        }
    };

    return {
        user,
        deleteAccount,
        signupWithGoogle,
        signinWithGoogle,
        GetAccess,
        signup,
        signin,
        logout,
        setUser,
        setAccessToken,
        accessToken,
        oauth,
        refreshToken,
        setOAuth
    };
};

export default useAuth;
