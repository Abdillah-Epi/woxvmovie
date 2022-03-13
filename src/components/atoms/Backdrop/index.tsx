import { motion } from "framer-motion";
import React from "react";

type BackdropProps = {
    url: string;
    styles?: string;
};

const Backdrop: React.VFC<BackdropProps> = ({ url, styles }) => {
    return <motion.img className={`h-full w-full rounded-3xl ${styles}`} src={url} alt='' />;
};

export default Backdrop;
