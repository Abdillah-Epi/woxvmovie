import React from "react";
import { useRecoilValue } from "recoil";
import SubHeader from "../../atoms/Typography/SubHeader";
import eye from "../../../assets/images/eye.svg";
import heart from "../../../assets/images/heart.svg";
import addpl from "../../../assets/images/addpl.svg";
import inpl from "../../../assets/images/inpl.svg";
import { movieHoveredAtom } from "../../../store/movies";
import { TVMovie } from "../../../store/types";

type BackdropInfosProps = {
    movie: TVMovie;
    title: string;
};

const BackdropInfos: React.FC<BackdropInfosProps> = ({ title, movie }) => {
    const selectedID = useRecoilValue(movieHoveredAtom);

    return (
        <>
            {selectedID === `${title}-${movie.id}` && (
                <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center space-y-10 bg-black/80'>
                    <div className='w-[70%]'>
                        <SubHeader
                            fontSize='sm:text-xl text-lg'
                            styles='sm:text-lg text-xs text-center'
                            text={movie.title}
                            color={"text-white"}
                        />
                    </div>
                    <div className='flex w-[80%] items-center justify-center space-x-6'>
                        <img className='h-3 w-3 cursor-pointer' src={heart} alt='' />
                        <img className='h-4 w-4 cursor-pointer' src={eye} alt='' />
                        <img className='h-5 w-5 cursor-pointer' src={addpl} alt='' />
                    </div>
                </div>
            )}
        </>
    );
};

export default BackdropInfos;
