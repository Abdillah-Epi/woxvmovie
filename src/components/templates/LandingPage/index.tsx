import React from 'react';
import Sidenav from '../../organisms/Sidenav';
import { motion } from 'framer-motion';

const LandingPage: React.FC = ({ children }) => {
    return (
        <motion.div exit={{ opacity: 0 }} className='sticky'>
            <div className='flex flex-col overflow-y-scroll bg-black'>{children}</div>
            <div className='fixed top-0 w-[80%]'>
                <Sidenav list={[{ path: '/signin', text: "S'identifier" }]} />
            </div>
        </motion.div>
    );
};

export default LandingPage;
