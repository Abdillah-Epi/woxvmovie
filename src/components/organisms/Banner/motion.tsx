import { motion, MotionProps } from 'framer-motion';

export const variantsBanner = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            delay: 1,
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        y: -200,
        transition: {
            duration: 0.5
        }
    }
};

export const variantsNav = {
    hidden: {
        opacity: 0,
        y: -100
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1
        }
    }
};

type BannerContainerAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const BannerContainerAnimation: React.FC<BannerContainerAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div {...otherProps} initial='hidden' animate='show' exit='exit'>
            {children}
        </motion.div>
    );
};

type PlayerAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const PlayerAnimation: React.FC<PlayerAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div {...otherProps} variants={variantsBanner}>
            {children}
        </motion.div>
    );
};

type DescriptionAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const DescriptionAnimation: React.FC<DescriptionAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div {...otherProps} variants={variantsBanner}>
            {children}
        </motion.div>
    );
};
