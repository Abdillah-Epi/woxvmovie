import React from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type CheckboxProps = React.HTMLAttributes<HTMLDivElement> & {
    text?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ text, className, ...otherProps }) => {
    return (
        <div className={otc(`flex items-center space-x-3 ${className}`)} {...otherProps}>
            <input type={'checkbox'} className={`h-5 w-5 cursor-pointer accent-woxvmovie-2`} />
            <span>{text}</span>
        </div>
    );
};

export default Checkbox;
