import React from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type TitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(({ children, className, ...otherProps }, ref) => {
    return (
        <h1 ref={ref} className={otc(`text-3xl font-black sm:text-5xl xl:text-7xl ${className}`)} {...otherProps}>
            {children}
        </h1>
    );
});

export default Title;
