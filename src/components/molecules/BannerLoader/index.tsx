import { motion } from "framer-motion";

const BannerLoader = () => {
    return (
        <div className='h-screen w-screen p-10'>
            <motion.div
                animate={{ opacity: [0.17, 0.87, 0.17] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className='h-full w-full rounded-lg bg-slate-600/80'
            />
        </div>
    );
};

export default BannerLoader;
