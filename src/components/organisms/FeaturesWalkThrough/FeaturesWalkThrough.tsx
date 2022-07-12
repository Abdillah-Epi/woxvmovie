import React from 'react';
import Feature from '../../molecules/Feature';
import tv from '../../../assets/videos/Tv.mp4';
import loading from '../../../assets/videos/Loading.mp4';
import phone from '../../../assets/images/phone.webp';

const FeaturesWalkThrough: React.FC = () => {
    return (
        <section>
            <Feature
                key={1}
                title='Watch Woxvmovie on your TV.'
                text='Watch Woxvmovie on your Smart TV, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.'
                video={tv}
                className={'bg-woxvmovie-5'}
            />
            <Feature
                key={2}
                title='Download your favourite series to watch offline.'
                text='Record your favourite programmes and always have something to watch.'
                video={loading}
                videoPos={'left'}
            />
            <Feature
                key={3}
                title='Wherever you are.'
                text='Watch movies and TV series with unlimited access on your TV, smartphone, tablet and computer, all included.'
                style={{ backgroundImage: `url(${phone})` }}
            />
        </section>
    );
};

export default FeaturesWalkThrough;
