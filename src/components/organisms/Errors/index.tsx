import React from 'react';
import Cover from '../../atoms/Cover';
import Nav from '../../molecules/Nav';
import cover from '../../../assets/images/cover.webp';
import { motion } from 'framer-motion';
import img_400 from '../../../assets/images/400.svg';
import img_500 from '../../../assets/images/500.svg';
import { useParams } from 'react-router-dom';

const OErrors: React.FC = () => {
    const param = useParams();
    return (
        <section className='relative h-screen w-screen bg-white'>
            <motion.div layoutId='cover' className='absolute inset-0 flex h-full items-center justify-center'>
                <img src={param.code === '400' ? img_400 : img_500} alt='' className='h-[80%] w-[80%]' />
            </motion.div>
            <div className='absolute top-0 h-full w-full p-5 lg:p-10'>
                <div className='h-[20%]'>
                    <Nav hideRightSide={true} />
                </div>
            </div>
        </section>
    );
};

export default OErrors;
