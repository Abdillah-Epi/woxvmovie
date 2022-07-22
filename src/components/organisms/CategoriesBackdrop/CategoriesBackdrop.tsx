import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useChooseCategories from '../../../hooks/useChooseCategories';
import { categoriesAtom, categoriesSelectedAtom } from '../../../store/categories';
import Button from '../../atoms/Button';
import CategorySelected from '../../molecules/CategorySelected';

const CategoriesBackdrop: React.FC = () => {
    const categories = useRecoilValue(categoriesAtom);
    const selected = useRecoilValue(categoriesSelectedAtom);
    const [updateUserGenresCallback] = useChooseCategories();

    return (
        <motion.div
            className={`flex flex-col space-y-10 ${
                selected.length <= 1 ? 'justify-start' : 'justify-center'
            } h-full w-full items-center bg-[#141414]`}
        >
            <motion.div layout className={`grid h-1/2 w-full grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4`}>
                <AnimatePresence presenceAffectsLayout>
                    {categories?.map((item, key) => {
                        if (!selected.includes(item)) return;
                        return <CategorySelected key={key} category={item} />;
                    })}
                </AnimatePresence>
            </motion.div>
            {selected.length === 4 && (
                <div className='flex w-[50%] justify-center sm:w-[20%]'>
                    <Button onClick={() => updateUserGenresCallback()} title='Validate' theme='primary' />
                </div>
            )}
        </motion.div>
    );
};

export default CategoriesBackdrop;
