import { MotionProps, motion } from 'framer-motion';

export const variantPlaylist = {
    hidden: {
        x: -200,
        opacity: 0
    },
    show: (i: number) => {
        return {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.07 * i,
                duration: 1
            }
        };
    },
    exit: (i: number) => {
        return {
            opacity: 0,
            x: 200,
            transition: {
                delay: 0.07 * i,
                duration: 0.5
            }
        };
    }
};

type ContainerItemAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const ContainerItemAnimation: React.FC<ContainerItemAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div initial='hidden' animate='show' exit='exit' {...otherProps}>
            {children}
        </motion.div>
    );
};

type ItemAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const ItemAnimation: React.FC<ItemAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div variants={variantPlaylist} {...otherProps}>
            {children}
        </motion.div>
    );
};
