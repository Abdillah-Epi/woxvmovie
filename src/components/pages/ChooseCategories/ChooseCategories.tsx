import React from 'react';
import useRouteStatus from '../../../hooks/useRouteStatus';
import Typography from '../../atoms/Typography';
import CategoriesBackdrop from '../../organisms/CategoriesBackdrop';
import CategoriesPoster from '../../organisms/CategoriesPoster';
import ChooseCategoriesTemplate from '../../templates/ChooseCategories';

const ChooseCategories: React.FC = () => {
    // Check if the user is logged
    useRouteStatus();

    return (
        <ChooseCategoriesTemplate>
            <div className='space-y-10 xl:h-[38%]'>
                <div className='flex h-20 w-full items-end justify-center'>
                    <Typography title='Selectionnez 4 catégories' className='text-woxvmovie-2' />
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
        </ChooseCategoriesTemplate>
    );
};

export default ChooseCategories;
