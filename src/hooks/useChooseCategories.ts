import { useNavigate } from '@tanstack/react-location';
import { useSetRecoilState } from 'recoil';
import { LocationGenerics } from '../router';
import { routeStatusAtom } from '../store/auth';
import { categoriesSelectedAtom } from '../store/categories';
import useMovie from './useMovie';

const useChooseCategories = () => {
    const navigate = useNavigate<LocationGenerics>();
    const resetSelection = useSetRecoilState(categoriesSelectedAtom);
    const { updateUserGenres } = useMovie();
    const setStatus = useSetRecoilState(routeStatusAtom);

    const updateUserGenresCallback = () => {
        updateUserGenres().then(res => {
            if (res && !res.success) return;
            resetSelection(() => []);
            setStatus(() => 'success');
            navigate({ to: '/app' });
        });
    };

    return [updateUserGenresCallback] as const;
};

export default useChooseCategories;
