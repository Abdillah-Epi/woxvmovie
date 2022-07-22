import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { LocationGenerics } from '../router';
import { routeStatusAtom } from '../store/auth';
import useAuth from './useAuth';

type SignUpFromValidator = {
    email: string;
    password: string;
};

const Validator = (email: string, password: string) => {
    let error: SignUpFromValidator = { email: '', password: '' };
    if (email === '') error.email = "l'email est requis.";
    if (password === '') error.password = 'the password is required.';
    return error;
};

export const useSignUp = (email: string, password: string) => {
    const navigate = useNavigate<LocationGenerics>();

    const { signup, error } = useAuth();
    const setStatus = useSetRecoilState(routeStatusAtom);
    const [errorMessage, setErrorMessage] = useState<SignUpFromValidator>({ email: '', password: '' });

    const signUpCallback = async () => {
        setErrorMessage(Validator(email, password));
        const res = await signup({ email, password });
        if (!res) return;
        if (res.success) {
            setStatus(() => 'genres');
            navigate({ to: '/app/genres' });
            return;
        }
        if (!res.success && typeof error === 'string') {
            setErrorMessage(c => ({ ...c, email: error }));
            return;
        }
    };

    return [signUpCallback, errorMessage] as const;
};
