import { motion } from 'framer-motion';

const TopsLoaderTemplate = () => {
    return (
        <>
            <div className='p-10'>
                <motion.div
                    animate={{ opacity: [0.17, 0.87, 0.17] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className='h-10 w-[20%] rounded-lg bg-slate-600/80'
                />
            </div>
            <div className='overflow-hidden'>
                <div className='flex w-full items-start space-x-10'>
                    <motion.div
                        animate={{ opacity: [0.17, 0.87, 0.17] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className='aspect-video w-24 min-w-[20rem] rounded-lg bg-slate-600/80'
                    />
                    <motion.div
                        animate={{ opacity: [0.17, 0.87, 0.17] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className='aspect-video w-24 min-w-[20rem] rounded-lg bg-slate-600/80'
                    />
                    <motion.div
                        animate={{ opacity: [0.17, 0.87, 0.17] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className='aspect-video w-24 min-w-[20rem] rounded-lg bg-slate-600/80'
                    />
                    <motion.div
                        animate={{ opacity: [0.17, 0.87, 0.17] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className='aspect-video w-24 min-w-[20rem] rounded-lg bg-slate-600/80'
                    />
                    <motion.div
                        animate={{ opacity: [0.17, 0.87, 0.17] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className='aspect-video w-24 min-w-[20rem] rounded-lg bg-slate-600/80'
                    />
                    <motion.div
                        animate={{ opacity: [0.17, 0.87, 0.17] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className='aspect-video w-24 min-w-[20rem] rounded-lg bg-slate-600/80'
                    />
                </div>
            </div>
        </>
    );
};

export default TopsLoaderTemplate;
