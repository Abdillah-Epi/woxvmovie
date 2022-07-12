import React from 'react';
import Typography from '../../atoms/Typography';

type HeadIntroProps = {};

const HeadIntro: React.FC<HeadIntroProps> = () => {
    return (
        <div className='flex w-full flex-col items-center justify-center space-y-6 text-center'>
            <div className='lg:w-[55%]'>
                <Typography
                    theme='title'
                    title={'Unlimited movies, TV series and more.'}
                    className={'text-center text-white'}
                />
            </div>
            <Typography
                theme='subtitle'
                title={'Wherever you are. Cancel at any time.'}
                className={'text-center text-lg font-bold text-white sm:text-3xl'}
            />
            <div className='sm:w-[50%]'>
                <Typography
                    title={
                        'Ready to watch Woxvmovie? Enter your email address to subscribe or reactivate your subscription.'
                    }
                    className={'text-xs font-semibold text-white sm:text-xl'}
                />
            </div>
        </div>
    );
};

export default HeadIntro;
