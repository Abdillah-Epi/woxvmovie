import { motion } from 'framer-motion';
import React, { useState } from 'react';

type PosterProps = {
    url: string;
    styles?: string;
};

const Poster: React.VFC<PosterProps> = ({ url, styles }) => {
    const [load, setLoad] = useState<boolean>(false);
    return (
        <>
            {load && (
                <motion.div
                    animate={{ opacity: [0.17, 0.87, 0.17] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className='aspect-9/16 h-full w-full min-w-[20rem] rounded-lg bg-slate-600/80'
                />
            )}
            <motion.img
                onError={() => setLoad(() => true)}
                onLoad={() => setLoad(() => false)}
                loading='lazy'
                className={`h-full w-full rounded-3xl object-cover ${styles}`}
                src={url}
                alt=''
            />
        </>
    );
};

export default Poster;
