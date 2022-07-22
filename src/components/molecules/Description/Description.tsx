import React from 'react';
import Button from '../../atoms/Button';
import { useRecoilValue } from 'recoil';
import { movieSelectedAtom } from '../../../store/movies';
import Typography from '../../atoms/Typography';

type DescriptionProps = {
    title: string;
    body: string;
};

const Description: React.FC<DescriptionProps> = ({ title, body }) => {
    const selectedMovie = useRecoilValue(movieSelectedAtom);

    if (!title && !body && !selectedMovie) return null;

    return (
        <div className='w-full space-y-3 sm:space-y-6'>
            <div>
                <Typography theme='title' title={title} className='text-white' />
            </div>
            <div className='2xl:w-[70%]'>
                <Typography
                    theme='paragraph'
                    className='text-justify text-[0.60rem] sm:text-xs font-light text-white lg:text-base'
                    title={body}
                />
            </div>
            <div className='w-[50%] h-8 sm:h-auto sm:w-[40%]'>
                <Button theme='primary' className='rounded-sm bg-woxvmovie-4/50 text-xs' title="Plus d'informations" />
            </div>
        </div>
    );
};

export default Description;
