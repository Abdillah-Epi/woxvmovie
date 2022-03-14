import React from 'react';
import Regular from '../../atoms/Typography/Regular';
import InputCreator from '../../molecules/InputCreator';
import Question from '../../molecules/Question';
import questions from './questions.json';
import { motion } from 'framer-motion';
import { variantDefault, variantList } from './motion';
type FAQProps = {};

const FAQ: React.FC<FAQProps> = () => {
    return (
        <motion.section
            initial='hidden'
            animate='show'
            exit='exit'
            className='flex w-full flex-col items-center space-y-10 py-14'
        >
            <Regular
                styles={'font-semibold'}
                fontSize={'text-sm sm:text-3xl xl:text-5xl'}
                text={'FAQ'}
                color={'text-white'}
            />
            <motion.div initial='hidden' animate='show' exit='exit' className='w-[90%] space-y-2 xl:w-[50%]'>
                {questions.map((q, key) => {
                    return (
                        <motion.div key={key} variants={variantList} custom={key}>
                            <Question text={q.q} />
                        </motion.div>
                    );
                })}
            </motion.div>
            <motion.div variants={variantDefault} custom={1} className='text-center lg:text-left'>
                <Regular
                    text='Ready to watch Woxvmoie? Enter your email address to subscribe or reactivate your subscription.'
                    color='text-white'
                />
            </motion.div>
            <motion.div variants={variantDefault} custom={1} className='lg:w-[30%]'>
                <InputCreator />
            </motion.div>
        </motion.section>
    );
};

export default FAQ;
