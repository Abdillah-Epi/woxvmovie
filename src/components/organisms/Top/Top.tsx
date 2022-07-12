import React, { useState } from 'react';
import useTrending from '../../../hooks/useTrending';
import Typography from '../../atoms/Typography';
import Rank from '../../molecules/Rank';
import { MotionDragContainer } from '../MoviesAndSeries/motion';

type TopProps = {
    title: string;
    path: 'trainding' | 'top/tv';
};

const Top: React.FC<TopProps> = ({ title, path }) => {
    const [pointerEvent, setPointer] = useState<boolean>(false);

    const [trending, error] = useTrending(path);

    if (!trending.length) return <></>;

    return (
        <div className='my-16 space-y-16'>
            <div className='px-10'>
                <Typography className='text-xl text-white sm:text-5xl' title={title} />
            </div>
            <MotionDragContainer setPointer={setPointer} className='h-full w-full cursor-grab overflow-hidden'>
                {trending.map((m, key) => {
                    if (key > 9) return;
                    return (
                        <div
                            key={key}
                            className={`w-24 min-w-[15rem] sm:min-w-[16rem] ${
                                pointerEvent ? 'pointer-events-none' : ''
                            } relative`}
                        >
                            <Rank rank={key} path={m.poster_path} />
                        </div>
                    );
                })}
            </MotionDragContainer>
        </div>
    );
};

export default Top;
