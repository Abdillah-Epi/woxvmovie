import React, { useState } from 'react';
import Link from '../../atoms/Link';
import Typography from '../../atoms/Typography';
import FormField from '../../molecules/FormField';
import Button from '../../atoms/Button';
import { useSignIn } from '../../../hooks/useSignIn';

const SignInFrom: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInCallback] = useSignIn(email, password);

    return (
        <div className='mt-4 flex h-[80%] w-full items-center justify-center xl:items-start'>
            <div className='h-4/6 w-4/5 bg-black/75 px-8 pt-8 lg:h-[90%] lg:px-16 lg:pt-16 xl:h-full xl:w-[30%]'>
                <div className='mb-20'>
                    <Typography theme='subtitle' className={'text-center text-3xl text-white'}>
                        {'Sign in'}
                    </Typography>
                </div>
                <div>
                    <div className='mb-8 space-y-4 sm:mb-14'>
                        <FormField
                            onChange={e => setEmail(e.target.value)}
                            className='h-10 rounded pl-5 sm:h-16'
                            placeholder='Email'
                            type='email'
                        />
                        <FormField
                            onChange={e => setPassword(e.target.value)}
                            className='h-10 rounded pl-5 sm:h-16'
                            placeholder='Password'
                            type='password'
                        />
                    </div>
                    <Button
                        onClick={signInCallback}
                        title={'Sign in'}
                        theme={'primary'}
                        className='h-10 rounded-sm sm:h-auto'
                    />
                </div>
                <div className='flex items-center justify-between py-4'></div>
                <div className='flex space-x-2 pt-4'>
                    <Typography className='flex space-x-2 text-xs font-light text-white lg:text-base'>
                        New to WOXVFLIX ?
                        <Link to='/signup' className='ml-2 cursor-pointer text-xs text-white lg:text-base'>
                            Sign Up
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default SignInFrom;
