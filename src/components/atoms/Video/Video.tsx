import React from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type VideoProps = React.HTMLAttributes<HTMLVideoElement> & {
    video: string;
};

const Video: React.VFC<VideoProps> = ({ video, className, ...otherProps }) => {
    return (
        <video {...otherProps} autoPlay loop muted className={otc(`aspect-video ${className}`)}>
            <source src={video} type='video/mp4' />
        </video>
    );
};

export default Video;
