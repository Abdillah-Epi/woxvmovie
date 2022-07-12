import React from "react";
import ReactPlayer from "react-player";
import useBreakpoint from "../../../hooks/useBreakPoint";

export type PlayerProps = {
    id: string;
};

const Player: React.FC<PlayerProps> = ({ id }) => {
    const { windowSize } = useBreakpoint();

    return (
        <div className='flex h-full w-full items-start'>
            <ReactPlayer
                controls={false}
                loop={true}
                playing
                muted
                width='100%'
                height={windowSize.width && windowSize.width > 1280 ? "100%" : "50%"}
                url={`https://www.youtube.com/embed/${id}`}
            />
        </div>
    );
};

export default Player;
