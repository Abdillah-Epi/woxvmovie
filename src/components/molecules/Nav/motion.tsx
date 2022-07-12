import { motion, MotionProps } from 'framer-motion';

export const variantHeader = {
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
    },
    exit: {
        y: -100,
        opacity: 0,
        transition: {
            duration: 0.5
        }
    }
};

export const variantBtn = {
    hidden: {
        opacity: 0,
        x: 100
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1
        }
    },
    exit: {
        x: 100,
        opacity: 0,
        transition: {
            duration: 0.5
        }
    }
};

export const variantLinks = {
    hidden: {
        opacity: 0
    },
    show: (i: number) => {
        return {
            opacity: 1,
            transition: {
                delay: 0.1 * i,
                duration: 1
            }
        };
    },
    exit: {
        y: -100,
        opacity: 0,
        transition: {
            duration: 0.5
        }
    }
};

type NavItemAnimationProps = {
    myKey: number;
};

export const NavItemAnimation: React.FC<NavItemAnimationProps> = ({ children, myKey }) => {
    return (
        <motion.div
            key={`${myKey}-NavItemAnimation`}
            initial='hidden'
            animate='show'
            exit='exit'
            variants={variantLinks}
            custom={myKey}
        >
            {children}
        </motion.div>
    );
};

type NavLinksAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const NavLinksAnimation: React.FC<NavLinksAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div {...otherProps} initial='hidden' animate='show' exit='exit'>
            {children}
        </motion.div>
    );
};

type LoggedNavAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const LoggedNavAnimation: React.FC<LoggedNavAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div variants={variantBtn} initial='hidden' animate='show' exit='exit' {...otherProps}>
            {children}
        </motion.div>
    );
};

type TitleAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const TitleAnimation: React.FC<TitleAnimationProps> = ({ children }) => {
    return <motion.div variants={variantHeader}>{children}</motion.div>;
};
