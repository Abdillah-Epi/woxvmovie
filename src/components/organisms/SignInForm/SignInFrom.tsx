import React, { useState } from 'react';
import Checkbox from '../../atoms/Checkbox';
import Link from '../../atoms/Link';
import google from '../../../assets/images/google.svg';
import useAuth from '../../../hooks/useAuth';
import { LocationGenerics } from '../../../router';
import { useNavigate } from '@tanstack/react-location';
import Typography from '../../atoms/Typography';
import FormField from '../../molecules/FormField';
import Button from '../../atoms/Button';
import { useSignIn } from '../../../hooks/useSignIn';

const SignInFrom: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpCallback, errorMessage] = useSignIn(email, password);
    const navigate = useNavigate<LocationGenerics>();

    const { signinWithGoogle } = useAuth();

    return (
        <div className='mt-4 flex h-[80%] w-full justify-center'>
            <div className='h-full bg-black/75 px-8 pt-8 lg:h-[90%] lg:px-16 lg:pt-16 xl:w-[30%]'>
                <div className='mb-20'>
                    <Typography theme='subtitle' className={'text-center text-white sm:text-3xl'}>
                        {'Connectez-vous'}
                    </Typography>
                </div>
                <div>
                    <div className='mb-14 space-y-4'>
                        <FormField
                            onChange={e => setEmail(e.target.value)}
                            className='h-16 rounded pl-5'
                            placeholder='E-mail'
                            type='email'
                        />
                        <FormField
                            onChange={e => setPassword(e.target.value)}
                            className='h-16 rounded pl-5'
                            placeholder='Ajouter un mot de passe'
                            type='password'
                        />
                    </div>
                    <Button onClick={signUpCallback} title={'Continue'} theme={'primary'} className='rounded-sm' />
                </div>
                <div className='flex items-center justify-between py-4'>
                    <Checkbox className='text-xs font-light text-white lg:text-base' text='Remember me' />
                    <Typography
                        onClick={() => navigate({ to: '/reset-password' })}
                        className='cursor-pointer text-xs font-light text-white lg:text-base'
                    >
                        mot de passe oublié ?
                    </Typography>
                </div>
                <Link
                    onClick={() => signinWithGoogle()}
                    to='/signin'
                    className='text-xs font-light text-white lg:text-base'
                    iconPrefix={google}
                >
                    connectez-vous avec Google
                </Link>
                <div className='flex space-x-2 pt-4'>
                    <Typography className='text-xs font-light text-white lg:text-base'>
                        première visite sur Woxvmovie ?
                        <Link
                            onClick={() => signinWithGoogle()}
                            to='/signup'
                            className='cursor-pointer text-xs text-white lg:text-base'
                        >
                            Inscrivez-vous
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default SignInFrom;
