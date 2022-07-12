import React from 'react';

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(({ children, ...otherProps }, ref) => {
    return (
        <p ref={ref} {...otherProps}>
            {children}
        </p>
    );
});

export default Paragraph;
