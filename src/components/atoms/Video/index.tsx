import React from "react";

type VideoProps = {
    video: string;
    styles: string;
};

const Video: React.VFC<VideoProps> = ({ video, styles }) => {
    return (
        <video autoPlay loop muted className={`${styles} aspect-video`}>
            <source src={video} type='video/mp4' />
        </video>
    );
};

export default Video;
