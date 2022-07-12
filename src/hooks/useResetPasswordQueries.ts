import { useMatch } from '@tanstack/react-location';
import { useState } from 'react';
import { ErrorAccess, ErrorResponse } from '../error';
import { SendRequest, UpdatePassword } from '../requests/auth';
import { LocationGenerics } from '../router';
import useCredentials from './useCredentials';

export interface RequestSuccess {
    body: string;
    success: true;
}

export type RequestResponse = RequestSuccess | ErrorResponse;

const useResetPasswordQueries = () => {
    const { oauth, setOAuth } = useCredentials();
    const [error, setError] = useState<ErrorResponse>();

    const sendRequest = async (email: string) => {
        setError(() => undefined);
        if (!oauth) return;
        const res = await SendRequest(email, oauth);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (res == 202) return 202;
        if (!res.success) return setError(() => res);
        return { success: true };
    };

    const params = useMatch<LocationGenerics>().params;
    const updatePassword = async (password: string) => {
        setError(() => undefined);
        if (!oauth) return;
        const res = await UpdatePassword(password, oauth, params.token);
        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (!res.success) return setError(() => res);
        return { success: true };
    };

    return { sendRequest, updatePassword, error };
};

export default useResetPasswordQueries;
