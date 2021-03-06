import { Link as ReactLocationLink } from '@tanstack/react-location';
import React from 'react';

type LinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
    text?: string;
    to: string;
    iconPrefix?: string;
    iconSuffix?: string;
};

const Link: React.FC<LinkProps> = ({ text, to, className, iconPrefix, iconSuffix, children, ...otherProps }) => {
    return (
        <ReactLocationLink
            {...otherProps}
            to={to}
            className={`flex cursor-pointer items-center space-x-3 ${className}`}
        >
            {iconPrefix && (
                <span className={`h-4 w-4 mr-2`}>
                    <img src={iconPrefix} alt='' />
                </span>
            )}
            {children ?? text}
            {iconSuffix && (
                <span className={`h-4 w-4`}>
                    <img src={iconSuffix} alt='' />
                </span>
            )}
        </ReactLocationLink>
    );
};

export default Link;
