import React from 'react';
import Typography from '../../atoms/Typography';
import Video from '../../atoms/Video';
import { TextAnimation, TextItemAnimation, VideoAnimation } from './motion';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type FeatureProps = React.HTMLAttributes<HTMLDivElement> & {
    title: string;
    text: string;
    videoPos?: 'left' | 'right';
    video?: string;
};

const Feature: React.FC<FeatureProps> = ({ title, text, videoPos = 'right', video, className, ...otherProps }) => {
    return (
        <div
            className={otc(
                `flex h-[36rem] w-full flex-col items-center justify-center space-y-16 bg-cover bg-fixed sm:py-96 xl:flex-row xl:py-0 xl:px-40 ${className}`
            )}
            {...otherProps}
        >
            {videoPos === 'left' && (
                <VideoAnimation pos={videoPos} className='flex justify-center xl:w-[60%] xl:justify-start'>
                    <Video className='w-[60%]' video={video!} />
                </VideoAnimation>
            )}
            <div className='flex w-[80%] justify-center xl:w-[40%]'>
                <TextAnimation className='w-full space-y-6'>
                    <TextItemAnimation i={0.5} pos={videoPos === 'left' ? 'right' : 'left'}>
                        <Typography
                            className={'text-sm font-semibold text-white sm:text-3xl xl:text-5xl'}
                            title={title}
                        />
                    </TextItemAnimation>
                    <TextItemAnimation i={0.7} pos={videoPos === 'left' ? 'right' : 'left'}>
                        <Typography className='text-xs font-light text-white sm:text-xl xl:text-3xl' title={text} />
                    </TextItemAnimation>
                </TextAnimation>
            </div>
            {videoPos === 'right' && (
                <VideoAnimation pos={videoPos} className='flex justify-center xl:w-[60%] xl:justify-end'>
                    <Video className='w-[60%]' video={video!} />
                </VideoAnimation>
            )}
        </div>
    );
};

export default Feature;
