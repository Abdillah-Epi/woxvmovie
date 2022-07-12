import { MotionProps, motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import useCarousel from '../../../hooks/useCarousel';
import { movieHoveredAtom } from '../../../store/movies';

type MotionDragContainerProps = React.HTMLAttributes<HTMLDivElement> &
    MotionProps & {
        setPointer: (value: React.SetStateAction<boolean>) => void;
    };

export const MotionDragContainer: React.FC<MotionDragContainerProps> = ({ children, setPointer, ...otherProps }) => {
    const [scrollWidth, width, ref] = useCarousel();
    return (
        <motion.div {...otherProps} ref={ref} whileTap={{ cursor: 'grabbing' }}>
            <MotionDrag scrollWidth={scrollWidth} width={width} setPointer={setPointer} className={`flex space-x-10`}>
                <AnimatePresence>{children}</AnimatePresence>
            </MotionDrag>
        </motion.div>
    );
};

type MotionDragProps = React.HTMLAttributes<HTMLDivElement> &
    MotionProps & {
        scrollWidth: number;
        setPointer: (value: React.SetStateAction<boolean>) => void;
        width: number;
    };

export const MotionDrag: React.FC<MotionDragProps> = ({ children, setPointer, scrollWidth, width, ...otherProps }) => {
    return (
        <motion.div
            {...otherProps}
            onDragStartCapture={() => setPointer(() => true)}
            onDragEndCapture={() => setPointer(() => false)}
            drag='x'
            dragConstraints={{ right: 0, left: -width }}
            style={{ width: scrollWidth }}
        >
            {children}
        </motion.div>
    );
};

type SharedElementsProps = React.HTMLAttributes<HTMLDivElement> &
    MotionProps & {
        movieKey: string;
        theme: 'backdrop' | 'poster';
    };

export const SharedElements: React.FC<SharedElementsProps> = ({
    children,
    movieKey,
    theme,
    className,
    ...otherProps
}) => {
    const movieHovered = useSetRecoilState(movieHoveredAtom);

    return (
        <motion.div
            {...otherProps}
            key={movieKey}
            className={`${
                theme === 'poster' ? 'aspect-9/16  min-w-[20rem]' : 'min-w-[15rem] sm:min-w-[20rem]'
            } ${className}`}
            onHoverEnd={() => movieHovered(() => null)}
            onHoverStart={() => movieHovered(() => movieKey)}
        >
            {children}
        </motion.div>
    );
};
