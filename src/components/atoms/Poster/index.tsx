import { motion } from "framer-motion";
import React from "react";

type PosterProps = {
    url: string;
    styles?: string;
};

const Poster: React.VFC<PosterProps> = ({ url, styles }) => {
    return (
        <motion.img
            //layoutId={url}
            className={`h-full w-full rounded-3xl object-cover ${styles}`}
            src={url}
            alt=''
        />
    );
};

export default Poster;
