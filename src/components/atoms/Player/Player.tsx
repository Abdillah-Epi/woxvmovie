import React from "react";
import ReactPlayer from "react-player";

export type PlayerProps = {
    id: string;
};

const Player: React.FC<PlayerProps> = ({ id }) => {
    return (
        <div className='h-full w-full'>
            <ReactPlayer
                style={{backgroundColor: '#141414'}}
                controls={false}
                loop={true}
                playing
                muted
                width='100%'
                height={"100%"}
                url={`https://www.youtube.com/embed/${id}`}
            />
        </div>
    );
};

export default Player;
