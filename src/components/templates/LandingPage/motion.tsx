import React from 'react';
import { motion } from 'framer-motion';

export const variantBody = {
    hidden: {
        opacity: 0,
        y: 200
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 1,
            duration: 1
        }
    },
    exit: {
        y: 300,
        opacity: 0,
        transition: {
            duration: 0.5
        }
    }
};

export const coverVariant = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            delay: 1,
            duration: 1
        }
    },
    exit: {
        opacity: 0,
        y: 200,
        transition: {
            duration: 1
        }
    }
};

export const HeadIntroAnimation: React.FC = ({ children }) => {
    return (
        <motion.div
            initial='hidden'
            animate='show'
            exit='exit'
            variants={variantBody}
            className='flex flex-col items-center space-y-6'
        >
            {children}
        </motion.div>
    );
};
