import React from 'react';
import Paragraph from './Paragraph';
import Subtitle from './Subtitle';
import Title from './Title';

type TypographyProps = React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> & {
    title?: string;
    theme?: 'paragraph' | 'title' | 'subtitle';
};
const Typography = React.forwardRef<HTMLHeadingElement | HTMLParagraphElement, TypographyProps>(
    ({ title = '', theme = 'paragraph', children, ...otherProps }, ref) => {
        switch (theme) {
            case 'paragraph':
                return (
                    <Paragraph suppressContentEditableWarning {...{ ref, ...otherProps }}>
                        {children ?? title}
                    </Paragraph>
                );
            case 'title':
                return (
                    <Title suppressContentEditableWarning {...{ ref, ...otherProps }}>
                        {children ?? title}
                    </Title>
                );
            case 'subtitle':
                return (
                    <Subtitle suppressContentEditableWarning {...{ ref, ...otherProps }}>
                        {children ?? title}
                    </Subtitle>
                );
            default:
                return null;
        }
    }
);

export default Typography;
