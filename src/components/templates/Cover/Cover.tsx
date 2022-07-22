import React from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type CoverProps = React.HTMLAttributes<HTMLDivElement> & {
    img?: string;
};

const Cover: React.FC<CoverProps> = ({ img, children, className, ...otherProps }) => {
    return (
        <div className='relative  h-full w-full'>
            <div
                {...otherProps}
                style={{ backgroundImage: `url(${img})` }}
                className={otc(`absolute inset-0 h-full w-full bg-cover bg-center ${className}`)}
            >
            </div>
            <div className='absolute inset-0 h-full w-full [background:linear-gradient(90deg,rgba(13,13,13,1)15%,rgba(13,13,13,0.2315519957983193)92%);]'>{children}</div>
        </div>
    );
};

export default Cover;
