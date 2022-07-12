import React from 'react';
import InputCreator from '../../molecules/InputCreator';
import HeadIntro from '../../molecules/HeadIntro';
import Nav from '../../molecules/Nav';
import { HeadIntroAnimation } from './motion';
import { useNavigate } from '@tanstack/react-location';
import { LocationGenerics } from '../../../router';
import { useSetRecoilState } from 'recoil';
import { EmailAtom } from '../../../store/signup';

const Hero: React.FC = () => {
    const navigate = useNavigate<LocationGenerics>();
    const setEmail = useSetRecoilState(EmailAtom);

    return (
        <div className='h-full w-full space-y-72 p-10'>
            <Nav />
            <HeadIntroAnimation className='flex flex-col items-center space-y-6'>
                <HeadIntro />
                <div className='lg:w-[30%]'>
                    <InputCreator
                        submitCallback={() => navigate({ to: '/signup' })}
                        placeholder='E-mail'
                        titleBtn='Get started'
                        type={'email'}
                        onChange={e => setEmail(() => e.target.value)}
                    />
                </div>
            </HeadIntroAnimation>
        </div>
    );
};

export default Hero;
