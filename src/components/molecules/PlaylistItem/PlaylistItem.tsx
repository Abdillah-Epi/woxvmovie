import React from 'react';
import Logo from '../../atoms/Logo';
import plus from '../../../assets/images/plus.svg';
import Typography from '../../atoms/Typography';
import { overrideTailwindClasses as otc } from 'tailwind-override';
type PlaylistProps = React.HTMLAttributes<HTMLDivElement> & {
    text: string;
};

const PlaylistItem: React.FC<PlaylistProps> = ({ text, className, ...otherProps }) => {
    return (
        <div
            {...otherProps}
            className={otc(
                `flex w-[100%] transform cursor-pointer items-center justify-between rounded-md bg-white p-2 transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg xl:p-4 ${className}`
            )}
        >
            <div className='flex items-center'>
                <Logo />
                <Typography className={'text-xs sm:text-base'} title={text} />
            </div>
            <img src={plus} className={'h-4 w-4'} alt='' />
        </div>
    );
};

export default PlaylistItem;
