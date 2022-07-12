import React from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type CoverProps = React.HTMLAttributes<HTMLDivElement> & {
    img?: string;
};

const Cover: React.FC<CoverProps> = ({ img, children, className, ...otherProps }) => {
    return (
        <div
            {...otherProps}
            style={{ backgroundImage: `url(${img})` }}
            className={otc(`h-full w-full bg-cover bg-center ${className}`)}
        >
            {children}
        </div>
    );
};

export default Cover;
