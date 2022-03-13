import React from "react";
import Poster from "../../atoms/Poster";
import one from "../../../assets/images/1.svg";
import two from "../../../assets/images/2.svg";
import three from "../../../assets/images/3.svg";
import four from "../../../assets/images/4.svg";
import five from "../../../assets/images/5.svg";
import six from "../../../assets/images/6.svg";
import seven from "../../../assets/images/7.svg";
import heigh from "../../../assets/images/8.svg";
import nine from "../../../assets/images/9.svg";
import ten from "../../../assets/images/10.svg";

type RankProps = {
    rank: number;
    path?: string;
};

const ranks: string[] = [one, two, three, four, five, six, seven, heigh, nine, ten];

const Rank: React.FC<RankProps> = ({ rank, path }) => {
    return (
        <div className='relative flex w-[70%]'>
            <img className='absolute h-48 md:h-64' src={ranks[rank]} alt='' />
            <div className='h-[80%] w-[80%] translate-x-20 md:translate-x-28'>
                <Poster styles='rounded-md' url={`https://image.tmdb.org/t/p/w500${path}`} />
            </div>
        </div>
    );
};

export default Rank;
