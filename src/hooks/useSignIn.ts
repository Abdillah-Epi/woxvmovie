import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { LocationGenerics } from '../router';
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

export const useSignIn = (email: string, password: string) => {
    const navigate = useNavigate<LocationGenerics>();

    const { signin, error } = useAuth();
    const [errorMessage, setErrorMessage] = useState<SignUpFromValidator>({ email: '', password: '' });

    const signUpCallback = async () => {
        setErrorMessage(Validator(email, password));
        const res = await signin(email, password);
        if (!res) return;
        if (res.success) {
            navigate({ to: '/app' });
            return;
        }
        if (!res.success && typeof error === 'string') {
            setErrorMessage(c => ({ ...c, email: "l'email ou le mot de passe n'est pas valide." }));
            setErrorMessage(c => ({ ...c, password: "l'email ou le mot de passe n'est pas valide." }));
            return;
        }
    };

    return [signUpCallback, errorMessage] as const;
};
