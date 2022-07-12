import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import { UpdateUserGenres } from '../requests/movies';
import { categoriesSelectedAtom } from '../store/categories';
import { UserAtom } from '../store/user';
import useCredentials from './useCredentials';

const useMovie = () => {
    const { accessToken, oauth, setOAuth, setAccessToken } = useCredentials();
    const setUser = useSetRecoilState(UserAtom);
    const selected = useRecoilValue(categoriesSelectedAtom);
    const [error, setError] = useState<ErrorResponse>();

    const updateUserGenres = async () => {
        setError(() => undefined);
        if (!oauth) return;
        if (!selected || !selected.length) return;
        if (!accessToken) return;

        const res = await UpdateUserGenres(oauth, accessToken, selected);

        if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
        if (res === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
        if (!res.success) return setError(() => res);

        setUser(c => ({
            ...c!,
            genres: selected.map(m =>
                m.name === 'Action & Adventure' ? 'Action' : m.name === 'Fantasy & Sci-Fi' ? 'Fantasy' : m.name
            )
        }));

        return res;
    };

    return { updateUserGenres, setOAuth, setAccessToken };
};

export default useMovie;
