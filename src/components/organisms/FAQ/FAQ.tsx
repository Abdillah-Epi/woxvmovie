import React from 'react';
import InputCreator from '../../molecules/InputCreator';
import Question from '../../molecules/Question';
import questions from './questions.json';
import { ContainerItemAnimation, variantDefault, variantList } from './motion';
import Typography from '../../atoms/Typography';
import { useNavigate } from '@tanstack/react-location';
import { LocationGenerics } from '../../../router';
type FAQProps = {};

const FAQ: React.FC<FAQProps> = () => {
    const navigate = useNavigate<LocationGenerics>();

    return (
        <ContainerItemAnimation className='flex w-full flex-col items-center space-y-10 py-14'>
            <Typography className={'text-sm font-semibold text-white sm:text-3xl xl:text-5xl'} title={'FAQ'} />
            <ContainerItemAnimation className='w-[90%] space-y-2 xl:w-[50%]'>
                {questions.map((q, key) => {
                    return (
                        <ContainerItemAnimation key={key} variants={variantList} custom={key}>
                            <Question text={q.q} />
                        </ContainerItemAnimation>
                    );
                })}
            </ContainerItemAnimation>
            <ContainerItemAnimation variants={variantDefault} custom={1} className='text-center lg:text-left'>
                <Typography
                    title='Ready to watch Woxvmovie? Enter your email address to subscribe or reactivate your subscription.'
                    className='text-white'
                />
            </ContainerItemAnimation>
            <ContainerItemAnimation variants={variantDefault} custom={1} className='lg:w-[30%]'>
                <InputCreator
                    submitCallback={() => navigate({ to: '/signup' })}
                    placeholder='E-mail'
                    titleBtn='Get started'
                    type={'email'}
                />
            </ContainerItemAnimation>
        </ContainerItemAnimation>
    );
};

export default FAQ;
