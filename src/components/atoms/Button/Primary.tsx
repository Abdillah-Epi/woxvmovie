import React from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type PrimaryProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Primary = ({ children, className, ...otherProps }: PrimaryProps) => (
    <button
        className={otc(
            `flex h-full w-full cursor-pointer items-center justify-center space-x-2 bg-woxvmovie-3 p-3 text-white hover:bg-woxvmovie-2 ${className}`
        )}
        {...otherProps}
    >
        {children}
    </button>
);

export default Primary;
