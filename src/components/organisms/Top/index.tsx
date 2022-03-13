import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useAuth from "../../../hooks/useAuth";
import useBreakpoint from "../../../hooks/useBreakPoint";
import { TopsTraindingAtom, TopsTraindingSelectorFamily } from "../../../store/movies";
import SubHeader from "../../atoms/Typography/SubHeader";
import Rank from "../../molecules/Rank";

type TopProps = {
    title: string;
    path: string;
};

const Top: React.FC<TopProps> = ({ title, path }) => {
    const [width, setWidth] = useState<number>(0);
    const [w, setW] = useState<number>(0);
    const carousel = useRef<HTMLDivElement | null>(null);
    const [pointerEvent, setPointer] = useState<boolean>(false);
    const { windowSize } = useBreakpoint();

    //---------------- ON MOUNT CALCULATE CAROUSEL LENGTH -------------
    useEffect(() => {
        if (carousel && carousel.current) {
            const scrollWidth = carousel.current.scrollWidth;
            const w = scrollWidth - carousel.current.offsetWidth;
            setW(() => scrollWidth);
            setWidth(() => w);
        }
    }, [windowSize]);
    //---------------- ON MOUNT CALCULATE CAROUSEL LENGTH -------------

    const movie = useRecoilValue(TopsTraindingSelectorFamily(path));
    const initTopsTrainding = useSetRecoilState(TopsTraindingAtom);
    const { setOAuth, setAccessToken } = useAuth();
    useEffect(() => {
        if (movie === 403) setOAuth(() => null);
        if (movie === 401) setAccessToken(() => null);
        if (!movie || typeof movie === "number" || path === "top/tv") return;
        initTopsTrainding(() => movie);
    }, [movie]);

    return typeof movie === "number" ? (
        <></>
    ) : !movie ? (
        <></>
    ) : (
        <div className='my-16 space-y-16'>
            <div className='px-10'>
                <SubHeader styles='sm:text-5xl text-xl' text={title} color={"text-white"} />
            </div>
            <motion.div
                key={title}
                ref={carousel}
                className='h-full w-full cursor-grab overflow-hidden'
                whileTap={{ cursor: "grabbing" }}
            >
                <motion.div
                    onDragStartCapture={() => setPointer(() => true)}
                    onDragEndCapture={() => setPointer(() => false)}
                    drag='x'
                    dragConstraints={{ right: 0, left: -width }}
                    style={{ width: w }}
                    className={`flex space-x-10`}
                >
                    {movie.map((m, key) => {
                        if (key > 9) return;
                        return (
                            <motion.div
                                key={key}
                                className={`w-24 min-w-[15rem] sm:min-w-[20rem] ${
                                    pointerEvent ? "pointer-events-none" : ""
                                } relative`}
                            >
                                <Rank rank={key} path={m.poster_path} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Top;
