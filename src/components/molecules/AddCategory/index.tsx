import { motion } from 'framer-motion';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { CategoriesData, categoriesSelectedAtom } from '../../../store/movies';
import Poster from '../../atoms/Poster';
import Body from '../../atoms/Typography/Body';

export type AddCategoryProps = {
    category: CategoriesData;
    index: number;
};

const variants = {
    hidden: {
        opacity: 0
    },
    show: (i: number) => {
        return {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5,
                duration: 1
            }
        };
    },
    exit: {
        y: 100 * -1
    }
};

const AddCategory: React.FC<AddCategoryProps> = ({ category, index }) => {
    const setCategories = useSetRecoilState(categoriesSelectedAtom);

    const Add = () => {
        setCategories(c => (c.length < 4 ? [...c, category] : c));
    };
    return (
        <motion.div
            variants={variants}
            initial='hidden'
            animate='show'
            exit='exit'
            custom={index}
            layoutId={category.name}
            className='relative cursor-pointer'
        >
            <motion.div>
                <Poster styles='rounded-md brightness-50' url={category.poster} />
            </motion.div>

            <motion.div
                layoutId={`p-${category.name}`}
                onClick={Add}
                className='absolute inset-0 flex h-full w-full items-center justify-center'
            >
                <Body text={category.name} color='text-white ' />
            </motion.div>
        </motion.div>
    );
};

export default AddCategory;
