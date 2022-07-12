import React from 'react';
import { useSetRecoilState } from 'recoil';
import { CategoriesData, categoriesSelectedAtom } from '../../../store/categories';
import Display from '../../atoms/Display';
import Typography from '../../atoms/Typography';
import { CharedElement, EaseInOut } from './motion';

export type AddCategoryProps = {
    category: CategoriesData;
    index: number;
};

const Category: React.FC<AddCategoryProps> = ({ category, index }) => {
    const setCategories = useSetRecoilState(categoriesSelectedAtom);

    const Add = () => {
        setCategories(c => (c.length < 4 ? [...c, category] : c));
    };

    return (
        <EaseInOut name={category.name} index={index} className='relative cursor-pointer'>
            <div>
                <Display theme='poster' className='rounded-md brightness-50' path={category.poster} />
            </div>

            <CharedElement name={category.name} onClick={Add}>
                <Typography title={category.name} className='text-white ' />
            </CharedElement>
        </EaseInOut>
    );
};

export default Category;
