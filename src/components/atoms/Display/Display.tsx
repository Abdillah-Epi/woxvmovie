import React from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type DisplayProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    path: string;
    theme: 'backdrop' | 'poster';
};

const Display: React.FC<DisplayProps> = ({ path, theme = 'poster', className, ...otherProps }) => {
    switch (theme) {
        case 'backdrop':
            return (
                <img
                    {...otherProps}
                    className={otc(`aspect-video ${className}`)}
                    src={`https://image.tmdb.org/t/p/w500${path}`}
                />
            );
        default:
            return (
                <img
                    {...otherProps}
                    className={otc(`aspect-9/16 h-full w-full rounded-lg object-cover ${className}`)}
                    src={`https://image.tmdb.org/t/p/w500${path}`}
                />
            );
    }
};

export default Display;
