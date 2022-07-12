import React, { useState } from 'react';
import { AverageContainerAnimation, CircleAnimation } from './motion';

type AverageProps = {
    average: number;
};

const Average: React.VFC<AverageProps> = ({ average }) => {
    const [per, setPer] = useState<string>('--%');

    return (
        <div className='relative flex items-center justify-center'>
            <AverageContainerAnimation>
                <CircleAnimation
                    setPer={setPer}
                    average={average}
                    className={'rounded-full fill-transparent stroke-woxvmovie-2 stroke-[12px]'}
                />
            </AverageContainerAnimation>
            <div className='absolute top-[45%] left-[45%]'>
                <p className='text-white'>{per}</p>
            </div>
        </div>
    );
};

export default Average;
