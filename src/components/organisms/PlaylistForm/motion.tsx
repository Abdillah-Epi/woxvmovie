import { MotionProps, motion } from 'framer-motion';
import { variantPlaylist } from '../PlaylistModal/motion';

type ContainerAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const ContainerAnimation: React.FC<ContainerAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div {...otherProps} initial='hidden' animate='show' exit='exit'>
            {children}
        </motion.div>
    );
};

type SlideAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const SlideAnimation: React.FC<SlideAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div {...otherProps} variants={variantPlaylist}>
            {children}
        </motion.div>
    );
};

type ItemContainerAnimationProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;

export const ItemContainerAnimation: React.FC<ItemContainerAnimationProps> = ({ children, ...otherProps }) => {
    return (
        <motion.div {...otherProps} initial='hidden' animate='show' exit='exit'>
            {children}
        </motion.div>
    );
};
