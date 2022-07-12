import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import {
    DeleteAccount,
    GetAccess,
    Logout,
    SignIn,
    SignInWithGoogle,
    SignUp,
    SignupParams,
    SignupWithGoogle
} from '../requests/auth';
import { CleanAuthSelector, routeStatusAtom } from '../store/auth';
import { UserAtom } from '../store/user';
import useCredentials from './useCredentials';

const useAuth = () => {
    const { accessToken, oauth, setAccessToken, setOAuth, setRefreshToken } = useCredentials();
    const setUser = useSetRecoilState(UserAtom);
    const [error, setError] = useState<ErrorResponse>();

    const signup = async (payload: SignupParams) => {
        setError(() => undefined);
        if (!oauth) return;
        const res = await SignUp(payload, oauth);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (!res.success) return setError(() => res);
        setAccessToken(() => res.access_token);
        setRefreshToken(() => res.refresh_token);
        return { success: true };
    };

    const signUpWithGoogle = async () => {
        setError(() => undefined);
        if (!oauth) return;
        const res = await SignupWithGoogle(oauth);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        return { success: true };
    };

    const signInWithGoogle = async () => {
        setError(() => undefined);
        if (!oauth) return;
        const res = await SignInWithGoogle(oauth);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        return { success: true };
    };

    const getAccess = async (token: string, type: 'signup' | 'signin') => {
        setError(() => undefined);

        if (!oauth) return;

        const res = await GetAccess(token, type, oauth);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);

        if (!res.success) return setError(() => res);
        setAccessToken(res.access_token);
        setRefreshToken(res.refresh_token);
        return { success: true };
    };

    const signin = async (email: string, password: string) => {
        setError(() => undefined);

        if (!oauth) return;
        const res = await SignIn(email, password, oauth);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (!res.success) return setError(() => res);
        setAccessToken(res.access_token);
        setRefreshToken(res.refresh_token);
        return { success: true };
    };

    const cleanAuthSession = useSetRecoilState(CleanAuthSelector);
    const setStatus = useSetRecoilState(routeStatusAtom);
    const logout = async () => {
        setError(() => undefined);

        if (!oauth) return;
        if (!accessToken) return;
        cleanAuthSession('');
        setStatus(() => 'public');
        const res = await Logout(accessToken, oauth);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (res === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        return { success: true };
    };

    const deleteAccount = async () => {
        setError(() => undefined);

        if (!oauth) return;
        if (!accessToken) return;
        cleanAuthSession('');
        setStatus(() => 'public');
        const res = await DeleteAccount(accessToken, oauth);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (res === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        return { success: true };
    };

    return {
        deleteAccount,
        signUpWithGoogle,
        signInWithGoogle,
        getAccess,
        signup,
        signin,
        logout,
        setUser,
        error
    };
};

export default useAuth;
