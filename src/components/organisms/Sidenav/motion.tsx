import { MotionProps, motion } from 'framer-motion';

const variant = {
    hidden: {
        x: -400
    },
    show: {
        x: 0,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        x: -400,
        transition: {
            duration: 0.5
        }
    }
};

type SlideAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const SlideAnimation: React.FC<SlideAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div {...otherProps} variants={variant} initial='hidden' animate='show' exit='exit'>
            {children}
        </motion.div>
    );
};
