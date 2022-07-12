import React, { useEffect, useState } from 'react';
import Link from '../../atoms/Link';
import google from '../../../assets/images/google.svg';
import useAuth from '../../../hooks/useAuth';

import Typography from '../../atoms/Typography';
import FormField from '../../molecules/FormField';
import Button from '../../atoms/Button';
import { useSignUp } from '../../../hooks/useSignUp';
import { useRecoilValue } from 'recoil';
import { EmailAtom } from '../../../store/signup';

const SignUpFrom: React.FC = () => {
    const defaultEmail = useRecoilValue(EmailAtom);

    const [email, setEmail] = useState(() => defaultEmail);
    const [password, setPassword] = useState('');

    const [signUpCallback, errorMessage] = useSignUp(email, password);

    const { signUpWithGoogle } = useAuth();

    return (
        <div className='mt-4 flex h-[80%] w-full justify-center'>
            <div className='h-full bg-black/75 px-8 pt-8 lg:h-[90%] lg:px-16 lg:pt-16 xl:w-[30%]'>
                <div className='mb-20'>
                    <Typography theme='subtitle' className={'text-center text-white sm:text-3xl'}>
                        {'Créez un mot de passe pour démarrer votre abonnement'}
                    </Typography>
                </div>
                <div>
                    <div className='mb-14 space-y-4'>
                        <FormField
                            onChange={e => setEmail(() => e.target.value)}
                            className='h-16 rounded pl-5'
                            placeholder='E-mail'
                            type='email'
                            value={email}
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
                <div className='pt-4'>
                    <Link onClick={() => signUpWithGoogle()} to='/signup' className='text-white' iconPrefix={google}>
                        register with Google
                    </Link>
                    <div className='flex flex-col pt-4 lg:flex-row lg:items-center lg:space-x-2'>
                        <Typography className='text-xs font-light text-white lg:text-base'>
                            Already have an account with Woxvmovie?
                        </Typography>
                        <Link to='/signin' className='text-xs text-white lg:text-base'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpFrom;
