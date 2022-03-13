import React, { Suspense } from "react";
import { useSetRecoilState } from "recoil";
import { movieHoveredAtom } from "../../../store/movies";
import { TVMovie } from "../../../store/types";
import { AnimatePresence, motion } from "framer-motion";
import Poster from "../../atoms/Poster";
import PosterInfos from "../PosterInfos";
import { LikeWatcher } from "../../organisms/Category";

type ListMakerProps = {
    movies: TVMovie[];
    show?: boolean;
};

const ListMaker: React.FC<ListMakerProps> = ({ movies, show = false }) => {
    const selectMovie = useSetRecoilState(movieHoveredAtom);

    return (
        <div className='grid w-full grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5'>
            <AnimatePresence>
                {movies.map((m, key) => {
                    return (
                        <motion.div
                            layoutId={`${m.id}`}
                            key={key}
                            onHoverEnd={() => selectMovie(() => null)}
                            onHoverStart={() => {
                                selectMovie(() => `1-${m.id}`);
                            }}
                            className={`relative w-full`}
                        >
                            <Suspense fallback={<div></div>}>
                                <LikeWatcher movie={m} />
                            </Suspense>
                            <Poster
                                styles='rounded-lg w-full aspect-9/16'
                                url={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                            />
                            <PosterInfos title={"1"} movie={m} />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default ListMaker;
