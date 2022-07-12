import { useNavigate } from '@tanstack/react-location';
import { s } from 'msw/lib/glossary-36cf4e2d';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { LocationGenerics } from '../../../router';
import { routeStatusAtom } from '../../../store/auth';
import Typography from '../../atoms/Typography';
import CategoriesBackdrop from '../../organisms/CategoriesBackdrop';
import CategoriesPoster from '../../organisms/CategoriesPoster';
import ChooseCategoriesTemplate from '../../templates/ChooseCategories';

const ChooseCategories: React.FC = () => {
    const navigate = useNavigate<LocationGenerics>();
    const status = useRecoilValue(routeStatusAtom);

    if (status !== 'success') navigate({ to: '/landing' });
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
