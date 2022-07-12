import { useNavigate } from '@tanstack/react-location';
import { useSetRecoilState } from 'recoil';
import { LocationGenerics } from '../router';
import { categoriesSelectedAtom } from '../store/categories';
import useMovie from './useMovie';

const useChooseCategories = () => {
    const navigate = useNavigate<LocationGenerics>();
    const resetSelection = useSetRecoilState(categoriesSelectedAtom);
    const { updateUserGenres } = useMovie();

    const updateUserGenresCallback = () => {
        updateUserGenres().then(res => {
            if (res && !res.success) return;
            resetSelection(() => []);
            navigate({ to: '/app' });
        });
    };

    return [updateUserGenresCallback] as const;
};

export default useChooseCategories;
