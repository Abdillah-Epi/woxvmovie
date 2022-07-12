import React, { useState } from 'react';
import Typography from '../../atoms/Typography';
import FormField from '../../molecules/FormField';
import Button from '../../atoms/Button';
import useSendRequest from '../../../hooks/useSendRequest';

const SendRequestForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [active, sendRequestCallback, errorMessage] = useSendRequest(email);

    return (
        <div className='flex h-full w-full items-center justify-center'>
            <div className='flex h-[80%] w-full justify-center'>
                <div className='h-[65%] bg-black/75 px-16 pt-16 xl:w-[30%]'>
                    <div className='mb-20'>
                        <Typography theme='subtitle' className={'text-center text-white sm:text-3xl'}>
                            Entrez votre adress mail
                        </Typography>
                    </div>
                    <div className={active ? '' : 'hidden'}>
                        <svg className='w-32' width='376' height='376' viewBox='0 0 376 376' fill='none'>
                            <path
                                d='M188 0C84.224 0 0 84.224 0 188C0 291.776 84.224 376 188 376C291.776 376 376 291.776 376 188C376 84.224 291.776 0 188 0ZM150.4 282L56.4 188L82.908 161.492L150.4 228.796L293.092 86.104L319.6 112.8L150.4 282Z'
                                fill='#F24C27'
                            />
                        </svg>
                    </div>
                    <div className={`${!active ? '' : 'hidden'} mb-14 space-y-4`}>
                        <FormField
                            onChange={e => setEmail(e.target.value)}
                            className='h-16 rounded pl-5'
                            placeholder='E-mail'
                            type='email'
                        />
                    </div>
                    <div className={!active ? '' : 'hidden'}>
                        <Button
                            onClick={() => sendRequestCallback()}
                            title={'Envoyer'}
                            theme={'primary'}
                            className='rounded-sm'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendRequestForm;
