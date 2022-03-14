import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useMovie from '../../../hooks/useMovie';
import { isClickedAtomFamily } from '../../../store/button';
import { categoriesAtom, categoriesSelectedAtom } from '../../../store/movies';
import Button from '../../atoms/Button';
import RemoveCategory from '../../molecules/RemoveCategory';

const CategoriesBackdrop: React.FC = () => {
    const [categories, setCategories] = useRecoilState(categoriesAtom);
    const [selected, resetSelection] = useRecoilState(categoriesSelectedAtom);
    const [isClicked, setClick] = useRecoilState(isClickedAtomFamily('Validate'));
    const { updateUserGenres } = useMovie();

    const navigate = useNavigate();
    useEffect(() => {
        if (!isClicked) return;
        setClick(() => false);
        updateUserGenres().then(res => {
            if (typeof res === 'number' || !res.success) return;
            resetSelection(() => []);
            navigate('/');
        });
    }, [isClicked]);

    return (
        <motion.div
            className={`flex flex-col space-y-10 ${
                selected.length <= 1 ? 'justify-start' : 'justify-center'
            } h-full w-full items-center bg-black`}
        >
            <motion.div layout className={`grid h-1/2 w-full grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4`}>
                <AnimatePresence presenceAffectsLayout>
                    {categories?.map((item, key) => {
                        if (!selected.includes(item)) return;
                        return <RemoveCategory key={key} category={item} />;
                    })}
                </AnimatePresence>
            </motion.div>
            {selected.length === 4 && (
                <div className='flex w-[20%] justify-center'>
                    <Button text='Validate' />
                </div>
            )}
        </motion.div>
    );
};

export default CategoriesBackdrop;
