import React from 'react';
import SubHeader from '../../atoms/Typography/SubHeader';
import CategoriesBackdrop from '../../organisms/CategoriesBackdrop';
import CategoriesPoster from '../../organisms/CategoriesPoster';
import TChooseCategories from '../../templates/ChooseCategories';

const ChooseCategories: React.FC = () => {
    return (
        <TChooseCategories>
            <div className='space-y-10 xl:h-[38%]'>
                <div className='flex h-20 w-full items-end justify-center'>
                    <SubHeader text='Selectionnez 4 catégories' color='text-woxvmovie-2' />
                </div>
                <div className='flex w-full justify-center px-3'>
                    <CategoriesBackdrop />
                </div>
            </div>
            <div className='flex min-h-fit w-full justify-center overflow-y-scroll'>
                <div className='h-4/5 w-4/5'>
                    <CategoriesPoster />
                </div>
            </div>
        </TChooseCategories>
    );
};

export default ChooseCategories;
