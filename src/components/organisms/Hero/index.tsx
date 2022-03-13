import React from 'react';
import Cover from '../../atoms/Cover';
import InputCreator from '../../molecules/InputCreator';
import HeadIntro from '../../molecules/HeadIntro';
import Nav from '../../molecules/Nav';
import cover from '../../../assets/images/cover.webp';
import { motion } from 'framer-motion';
import { variantBody } from './motion';

const Hero: React.FC = () => {
    return (
        <section className='relative h-screen w-screen'>
            <motion.div layoutId='cover' className='absolute inset-0'>
                <Cover img={cover} />
            </motion.div>
            <div className='absolute top-0 h-full w-full space-y-72 p-10'>
                <Nav />
                <motion.div
                    initial='hidden'
                    animate='show'
                    exit='exit'
                    variants={variantBody}
                    className='flex flex-col items-center space-y-6'
                >
                    <HeadIntro />
                    <div className='lg:w-[30%]'>
                        <InputCreator />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
