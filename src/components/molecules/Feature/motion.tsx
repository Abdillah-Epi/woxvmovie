import { motion, MotionProps } from 'framer-motion';

export const variantFeatures = {
    hidden: ({ i, pos }: { i: number; pos: 'left' | 'right' }) => {
        return {
            opacity: 0,
            x: pos === 'left' ? -200 : 200
        };
    },
    show: ({ i, pos }: { i: number; pos: 'left' | 'right' }) => {
        return {
            opacity: 1,
            x: 0,
            transition: {
                delay: i,
                duration: 1
            }
        };
    },
    exit: ({ i, pos }: { i: number; pos: 'left' | 'right' }) => {
        return {
            opacity: 0,
            x: pos === 'left' ? -200 : 200,
            transition: {
                delay: i,
                duration: 0.5
            }
        };
    }
};

type VideoAnimationProps = React.HTMLAttributes<HTMLDivElement> &
    MotionProps & {
        pos?: 'left' | 'right';
    };

export const VideoAnimation: React.FC<VideoAnimationProps> = ({ children, pos, ...otherProps }) => {
    return (
        <motion.div
            initial='hidden'
            animate='show'
            exit='exit'
            variants={variantFeatures}
            custom={{ i: 0.5, pos }}
            {...otherProps}
        >
            {children}
        </motion.div>
    );
};

type TextAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const TextAnimation: React.FC<TextAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div initial='hidden' animate='show' exit='exit' {...otherProps}>
            {children}
        </motion.div>
    );
};

type TextItemAnimationProps = React.HTMLAttributes<HTMLDivElement> &
    MotionProps & {
        i: number;
        pos: 'left' | 'right';
    };

export const TextItemAnimation: React.FC<TextItemAnimationProps> = ({ children, i, pos, ...otherProps }) => {
    return (
        <motion.div variants={variantFeatures} custom={{ i, pos }} {...otherProps}>
            {children}
        </motion.div>
    );
};
