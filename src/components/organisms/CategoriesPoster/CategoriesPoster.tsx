import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { categoriesAtom, categoriesSelectedAtom } from '../../../store/categories';
import Category from '../../molecules/Category';

const CategoriesPoster: React.FC = () => {
    const categories = useRecoilValue(categoriesAtom);
    const selected = useRecoilValue(categoriesSelectedAtom);

    return (
        <motion.div className='flex w-full items-center justify-center'>
            <motion.div layout className='grid grid-cols-3 gap-4 lg:grid-cols-6'>
                <AnimatePresence presenceAffectsLayout>
                    {categories?.map((item, key) => {
                        if (selected.includes(item)) return;
                        return <Category key={key} index={key} category={item} />;
                    })}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default CategoriesPoster;
