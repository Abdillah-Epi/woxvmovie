import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { LocationGenerics } from '../router';
import useResetPasswordQueries from './useResetPasswordQueries';

type ResetPasswordFromValidator = {
    password: string;
};

const Validator = (password: string, confirmation: string) => {
    let error: ResetPasswordFromValidator = { password: '' };
    if (password !== confirmation) error.password = `This password is not the same as the other one.`;
    return error;
};

export const useResetPassword = (password: string, confirmation: string) => {
    const navigate = useNavigate<LocationGenerics>();
    const [errorMessage, setErrorMessage] = useState<ResetPasswordFromValidator>({ password: '' });
    const { updatePassword } = useResetPasswordQueries();

    // TODO: the token on the URL is not used, but it should be
    const signUpCallback = () => {
        setErrorMessage(Validator(password, confirmation));
        updatePassword(password).then(res => {
            if (res && res.success) {
                navigate({ to: '/signin' });
            } else {
                setErrorMessage(() => ({ password: 'Fail to reset password.' }));
            }
        });
    };
    return [signUpCallback, errorMessage] as const;
};
