import React from 'react';
import Primary from './Primary';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    theme: 'primary';
    title?: string;
};

const Button = ({ theme, title = 'text', children, ...otherProps }: ButtonProps) => {
    switch (theme) {
        case 'primary':
            return <Primary {...otherProps}>{children ?? title}</Primary>;
        default:
            return null;
    }
};

export default Button;
