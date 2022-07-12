import { useEffect, useRef, useState } from 'react';
//import useBreakpoint from './useBreakPoint';

const useCarousel = () => {
    const [width, setWidth] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);
    //const { windowSize } = useBreakpoint();

    //---------------- ON MOUNT CALCULATE CAROUSEL LENGTH -------------
    useEffect(() => {
        if (ref && ref.current) {
            const scrollWidth = ref.current.scrollWidth;
            const w = scrollWidth - ref.current.offsetWidth;
            setScrollWidth(() => scrollWidth);
            setWidth(() => w);
        }
    }, [ref.current?.scrollWidth]);
    //---------------- ON MOUNT CALCULATE CAROUSEL LENGTH -------------

    return [scrollWidth, width, ref] as const;
};

export default useCarousel;
