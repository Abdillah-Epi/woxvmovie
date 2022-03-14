import { motion } from 'framer-motion';
import React from 'react';
import { useRecoilState } from 'recoil';
import { CategoriesData, categoriesSelectedAtom } from '../../../store/movies';
import Poster from '../../atoms/Poster';
import Body from '../../atoms/Typography/Body';

export type RemoveCategoryProps = {
    category: CategoriesData;
};

const variants = {
    exit: {
        y: 100
    }
};

const RemoveCategory: React.FC<RemoveCategoryProps> = ({ category }) => {
    const [categories, setCategories] = useRecoilState(categoriesSelectedAtom);

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
                <Poster styles='rounded-md brightness-50' url={category.backdrop} />
            </motion.div>
            <motion.div
                layoutId={`t-${category.name}`}
                onClick={Remove}
                className='absolute inset-0 flex aspect-video w-full items-center justify-center'
            >
                <Body text={category.name} color='text-white ' />
            </motion.div>
        </motion.div>
    );
};

export default RemoveCategory;
