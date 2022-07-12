import React from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type SubtitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const Subtitle = React.forwardRef<HTMLHeadingElement, SubtitleProps>(({ children, className, ...otherProps }, ref) => {
    return (
        <h2 ref={ref} className={otc(`text-xs font-bold sm:text-xl ${className}`)} {...otherProps}>
            {children}
        </h2>
    );
});

export default Subtitle;
