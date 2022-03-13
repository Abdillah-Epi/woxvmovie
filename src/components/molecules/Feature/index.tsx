import React from "react";
import Regular from "../../atoms/Typography/Regular";
import Video from "../../atoms/Video";
import { motion } from "framer-motion";
import { variantFeatures } from "./motion";

type FeatureProps = {
    title: string;
    text: string;
    videoPos?: "left" | "right";
    video?: string;
    img?: string | null;
    styles?: string;
};

const Feature: React.FC<FeatureProps> = ({ title, text, videoPos = "right", video, styles, img }) => {
    return (
        <div
            style={{ backgroundImage: `url(${img ? img : ""})` }}
            className={`${styles} flex h-[36rem] w-full flex-col items-center justify-center space-y-16 bg-cover bg-fixed sm:py-96 xl:flex-row xl:py-0 xl:px-40`}
        >
            {videoPos === "left" && (
                <motion.div
                    initial='hidden'
                    animate='show'
                    exit='exit'
                    variants={variantFeatures}
                    custom={{ i: 0.5, pos: videoPos }}
                    className='flex justify-center xl:w-[60%] xl:justify-start'
                >
                    <Video styles='w-[60%]' video={video!} />
                </motion.div>
            )}
            <div className='flex w-[80%] justify-center xl:w-[40%]'>
                <motion.div initial='hidden' animate='show' exit='exit' className='w-full space-y-6'>
                    <motion.div
                        variants={variantFeatures}
                        custom={{ i: 0.5, pos: videoPos === "left" ? "right" : "left" }}
                    >
                        <Regular
                            styles={"font-semibold"}
                            fontSize={"text-sm sm:text-3xl xl:text-5xl"}
                            text={title}
                            color={"text-white"}
                        />
                    </motion.div>
                    <motion.div
                        variants={variantFeatures}
                        custom={{ i: 0.7, pos: videoPos === "left" ? "right" : "left" }}
                    >
                        <Regular
                            styles='font-light'
                            fontSize={"text-xs sm:text-xl xl:text-3xl"}
                            text={text}
                            color={"text-white"}
                        />
                    </motion.div>
                </motion.div>
            </div>
            {videoPos === "right" && (
                <motion.div
                    initial='hidden'
                    animate='show'
                    exit='exit'
                    variants={variantFeatures}
                    custom={{ i: 0.5, pos: videoPos }}
                    className='flex justify-center xl:w-[60%] xl:justify-end'
                >
                    <Video styles='w-[60%]' video={video!} />
                </motion.div>
            )}
        </div>
    );
};

export default Feature;
