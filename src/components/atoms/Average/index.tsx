import { motion } from 'framer-motion';
import React, { useState } from 'react';

type AverageProps = {
    average: number;
};

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: ({ i, length }: { i: number; length: number }) => {
        const delay = i * 0.5;
        return {
            pathLength: length / 10,
            opacity: 1,
            transition: {
                pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 }
            }
        };
    }
};

const Average: React.VFC<AverageProps> = ({ average }) => {
    const [per, setPer] = useState<string>('--%');

    return (
        <div className='relative flex items-center justify-center'>
            <motion.svg
                className={''}
                width='200'
                height='200'
                viewBox='0 0 600 600'
                initial='hidden'
                animate='visible'
            >
                <motion.circle
                    onAnimationComplete={() => setPer(() => `${average * 10}%`)}
                    cx='300'
                    cy='300'
                    r='200'
                    className={'rounded-full fill-transparent stroke-woxvmoie-2 stroke-[12px]'}
                    variants={draw}
                    strokeLinecap='round'
                    custom={{ i: 0.5, length: average }}
                />
            </motion.svg>
            <div className='absolute top-[45%] left-[45%]'>
                <p className='text-white'>{per}</p>
            </div>
        </div>
    );
};

export default Average;
