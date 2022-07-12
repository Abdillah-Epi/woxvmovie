import { MotionProps, motion } from 'framer-motion';

const variants = {
    hidden: {
        opacity: 0
    },
    show: (i: number) => {
        return {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5,
                duration: 1
            }
        };
    },
    exit: {
        y: 100 * -1
    }
};

type EaseInOutProps = React.HTMLAttributes<HTMLDivElement> &
    MotionProps & {
        name: string;
        index: number;
    };

export const EaseInOut: React.FC<EaseInOutProps> = ({ children, name, index, ...otherProps }) => {
    return (
        <motion.div
            variants={variants}
            initial='hidden'
            animate='show'
            exit='exit'
            custom={index}
            layoutId={name}
            {...otherProps}
        >
            {children}
        </motion.div>
    );
};

type CharedElementProps = React.HTMLAttributes<HTMLDivElement> &
    MotionProps & {
        name: string;
    };

export const CharedElement: React.FC<CharedElementProps> = ({ name, children, ...otherProps }) => {
    return (
        <motion.div
            {...otherProps}
            layoutId={`p-${name}`}
            className='absolute inset-0 flex h-full w-full items-center justify-center'
        >
            {children}
        </motion.div>
    );
};
