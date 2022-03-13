import { useEffect, useState } from "react";

type WindowSizeState = {
    width: number | undefined;
    height: number | undefined;
};

const breakpoints = {
    0: "xs",
    600: "sm",
    960: "md",
    1280: "lg",
    1920: "xl"
};

const useBreakpoint = () => {
    const [breakpoint, setBreakPoint] = useState<string>("");
    const [windowSize, setWindowSize] = useState<WindowSizeState>({
        width: undefined,
        height: undefined
    });

    const handleResize = () => {
        setWindowSize(() => ({
            width: window.innerWidth,
            height: window.innerHeight
        }));
    };

    useEffect(() => {
        setWindowSize(() => ({
            width: window.innerWidth,
            height: window.innerHeight
        }));
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        if (!windowSize.height || !windowSize.width) return;

        if (0 < windowSize.width && windowSize.width < 600) {
            setBreakPoint(breakpoints[0]);
        }
        if (600 < windowSize.width && windowSize.width < 960) {
            setBreakPoint(breakpoints[600]);
        }
        if (960 < windowSize.width && windowSize.width < 1280) {
            setBreakPoint(breakpoints[960]);
        }
        if (1280 < windowSize.width && windowSize.width < 1920) {
            setBreakPoint(breakpoints[1280]);
        }
        if (windowSize.width >= 1920) {
            setBreakPoint(breakpoints[1920]);
        }

        return () => window.removeEventListener("resize", handleResize);
    }, [windowSize.width]);
    return { breakpoint, windowSize };
};

export default useBreakpoint;
