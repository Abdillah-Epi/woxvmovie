import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import useBreakpoint from "../../../hooks/useBreakPoint";
import { movieHoveredAtom } from "../../../store/movies";
import { TVMovie } from "../../../store/types";
import Backdrop from "../../atoms/Backdrop";
import SubHeader from "../../atoms/Typography/SubHeader";
import BackdropInfos from "../../molecules/BackdropInfos";

type SuggestionProps = {
    title: string;
    movies: TVMovie[];
};

const Suggestion: React.FC<SuggestionProps> = ({ title, movies }) => {
    const [width, setWidth] = useState<number>(0);
    const [w, setW] = useState<number>(0);
    const carousel = useRef<HTMLDivElement | null>(null);
    const [pointerEvent, setPointer] = useState<boolean>(false);
    const selectMovie = useSetRecoilState(movieHoveredAtom);
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

    return (
        <div className='my-16 space-y-16'>
            <div className='px-10'>
                <SubHeader styles='sm:text-5xl text-xl' text={title} color={"text-white"} />
            </div>
            <motion.div
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
                    className={`flex space-x-3`}
                >
                    {movies.map((movie, key) => {
                        return (
                            <motion.div
                                key={key}
                                onHoverEnd={() => selectMovie(() => null)}
                                onHoverStart={() => selectMovie(() => `${title}-${movie.id}`)}
                                //onTapStart={() => selectMovie((c) => c ? null : movie.id)}
                                className={`w-24 min-w-[15rem] sm:min-w-[20rem] ${
                                    pointerEvent ? "pointer-events-none" : ""
                                } relative`}
                            >
                                <Backdrop
                                    styles='rounded'
                                    url={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                />
                                <BackdropInfos title={title} movie={movie} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Suggestion;
