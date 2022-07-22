import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ErrorAccess, ErrorResponse } from '../error';
import { ToggleLike } from '../requests/likes';
import { FavoritesAtomFamily, FavoritesSelectorFamily } from '../store/linkes';
import { TVMovie } from '../store/types';
import useCredentials from './useCredentials';

const useLikeAction = (id: number, movie: TVMovie, on: string) => {
    const { accessToken, oauth, setOAuth, setAccessToken } = useCredentials();

    const [error, setError] = useState<ErrorResponse>();

    // consult the state of the like by websocket
    useRecoilValue(FavoritesSelectorFamily(id));
    const [isLiked, toggleLikeStatus] = useRecoilState(FavoritesAtomFamily(id));

    const LikeCallback = async () => {
        if (!accessToken || !oauth) return;

        ToggleLike(movie, accessToken, oauth).then(res => {
            if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
            if (res === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
            if (!res.success) return setError(() => res);

            toggleLikeStatus(() => res.liked);
        });
    };

    return [isLiked, LikeCallback, error] as const;
};

export default useLikeAction;
