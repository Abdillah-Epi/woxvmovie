import React, { useState } from 'react';
import Link from '../../atoms/Link';

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

    const [signUpCallback] = useSignUp(email, password);

    return (
        <div className='mt-4 flex h-[80%] w-full items-center justify-center sm:p-0 xl:items-start'>
            <div className='h-4/6 w-4/5 bg-black/75 px-8 pt-8 sm:h-4/6 lg:h-[90%] lg:px-16 lg:pt-16 xl:h-full xl:w-[30%]'>
                <div className='mb-20'>
                    <Typography theme='subtitle' className={'text-center text-3xl text-white'}>
                        {'Sign up'}
                    </Typography>
                </div>
                <div>
                    <div className='mb-14 space-y-4'>
                        <FormField
                            onChange={e => setEmail(() => e.target.value)}
                            className='h-10 rounded pl-5 sm:h-16'
                            placeholder='Email'
                            type='email'
                            value={email}
                        />
                        <FormField
                            onChange={e => setPassword(e.target.value)}
                            className='h-10 rounded pl-5 sm:h-16'
                            placeholder='Password'
                            type='password'
                        />
                    </div>
                    <Button
                        onClick={signUpCallback}
                        title={'Sign up'}
                        theme={'primary'}
                        className='h-10 rounded-sm sm:h-auto'
                    />
                </div>
                <div className='pt-4'>
                    <div className='flex flex-col pt-4 lg:flex-row lg:items-center lg:space-x-2'>
                        <Typography className='flex text-xs font-light text-white lg:text-base'>
                            Already have an account with WOXVFLIX?
                        </Typography>
                        <Link to='/signin' className='text-xs text-white sm:ml-2 lg:text-base'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpFrom;
