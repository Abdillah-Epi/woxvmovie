import React from 'react';
import Body from '../../atoms/Typography/Body';
import Header from '../../atoms/Typography/Header';
import SubHeader from '../../atoms/Typography/SubHeader';

type HeadIntroProps = {};

const HeadIntro: React.FC<HeadIntroProps> = () => {
    return (
        <div className='flex w-full flex-col items-center justify-center space-y-6 text-center'>
            <div className='lg:w-[55%]'>
                <Header text={'Unlimited movies, TV series and more.'} color={'text-white'} />
            </div>
            <SubHeader text={'Wherever you are. Cancel at any time.'} color={'text-white'} />
            <div className='sm:w-[50%]'>
                <Body
                    text={
                        'Ready to watch Woxvmoie? Enter your email address to subscribe or reactivate your subscription.'
                    }
                    color={'text-white'}
                />
            </div>
        </div>
    );
};

export default HeadIntro;
