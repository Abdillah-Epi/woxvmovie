import React, { useState } from 'react';

import FormField from '../../molecules/FormField';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import { useResetPassword } from '../../../hooks/useResetPassword';

const ResetPasswordForm: React.FC = () => {
    const [passNew, setPassNew] = useState('');
    const [passConf, setPassConf] = useState('');

    const [signUpCallback, errorMessage] = useResetPassword(passNew, passConf);

    return (
        <div className='flex h-full w-full items-center justify-center'>
            <div className='flex h-[80%] w-full justify-center'>
                <div className='h-[75%] bg-black/75 px-16 pt-16 xl:w-[30%]'>
                    <div className='mb-20'>
                        <Typography theme='subtitle' className={'text-center text-white sm:text-3xl'}>
                            Créer un nouveau mot de passe
                        </Typography>
                    </div>
                    <div className='mb-14 space-y-4'>
                        <FormField
                            onChange={e => setPassNew(e.target.value)}
                            className='h-16 rounded pl-5'
                            placeholder='Nouveau mot de passe'
                            type='password'
                        />
                        <FormField
                            onChange={e => setPassConf(e.target.value)}
                            className='h-16 rounded pl-5'
                            placeholder='Confirmer le mot de passe'
                            type='password'
                        />
                    </div>
                    <div>
                        <Button
                            onClick={() => signUpCallback()}
                            title={'Validate'}
                            theme={'primary'}
                            className='rounded-sm'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
