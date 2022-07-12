import { motion } from 'framer-motion';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { CategoriesData, categoriesSelectedAtom } from '../../../store/categories';
import Display from '../../atoms/Display';
import Typography from '../../atoms/Typography';

export type RemoveCategoryProps = {
    category: CategoriesData;
};

const variants = {
    exit: {
        y: 100
    }
};

const CategorySelected: React.FC<RemoveCategoryProps> = ({ category }) => {
    const setCategories = useSetRecoilState(categoriesSelectedAtom);

    const Remove = () => {
        setCategories(c => c.filter(i => i.id !== category.id));
    };
    return (
        <motion.div
            variants={variants}
            exit='exit'
            layoutId={category.name}
            className='relative h-full w-full cursor-pointer'
        >
            <motion.div className='aspect-video w-full'>
                <Display theme='backdrop' className='rounded-md brightness-50' path={category.backdrop} />
            </motion.div>
            <motion.div
                layoutId={`t-${category.name}`}
                onClick={Remove}
                className='absolute inset-0 flex aspect-video w-full items-center justify-center'
            >
                <Typography title={category.name} className='text-white ' />
            </motion.div>
        </motion.div>
    );
};

export default CategorySelected;
