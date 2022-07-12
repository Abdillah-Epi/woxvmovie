import { MotionProps, motion } from 'framer-motion';

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: ({ i, length }: { i: number; length: number }) => {
        const delay = i * 0.5;
        return {
            pathLength: length / 10,
            opacity: 1,
            transition: {
                pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 }
            }
        };
    }
};

type MotionSVG = React.HTMLAttributes<HTMLOrSVGElement> & MotionProps;

export const AverageContainerAnimation: React.FC<MotionSVG> = ({ children, ...otherProps }) => {
    return (
        <motion.svg {...otherProps} width='200' height='200' viewBox='0 0 600 600' initial='hidden' animate='visible'>
            {children}
        </motion.svg>
    );
};

type MotionCircle = React.HTMLAttributes<SVGCircleElement> &
    MotionProps & {
        setPer: (value: React.SetStateAction<string>) => void;
        average: number;
    };

export const CircleAnimation: React.FC<MotionCircle> = ({ average, setPer, children, ...otherProps }) => {
    return (
        <motion.circle
            {...otherProps}
            onAnimationComplete={() => setPer(() => `${average * 10}%`)}
            cx='300'
            cy='300'
            r='200'
            variants={draw}
            strokeLinecap='round'
            custom={{ i: 0.5, length: average }}
        />
    );
};
