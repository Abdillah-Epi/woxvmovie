import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ErrorAccess } from '../error';
import { ToggleLike } from '../requests/likes';
import { FavoritesAtom, FavoritesAtomFamily } from '../store/linkes';
import { TVMovie } from '../store/types';
import useCredentials from './useCredentials';

export type LikeAction = { action: 'unlike' | 'like'; movie: TVMovie };
const useLikeAction = () => {
    const [like, setLike] = useState<LikeAction>();
    const [likes, updateLocalLikes] = useRecoilState(FavoritesAtom);
    const { accessToken, oauth, setOAuth, setAccessToken } = useCredentials();
    const toggleLikeStatus = useSetRecoilState(FavoritesAtomFamily(like ? like.movie.id : -1));

    useEffect(() => {
        if (!like) return;
        if (like.action === 'unlike' && !likes.length) return;
        if (!accessToken || !oauth) return;

        ToggleLike(like.movie, like.action, accessToken, oauth).then(res => {
            if (res === ErrorAccess.FORBIDDEN) return setOAuth(() => null);
            if (res === ErrorAccess.UNAUTHORIZED) return setAccessToken(() => null);
            toggleLikeStatus(status => !status);
            res.success && updateLocalLikes(() => res.movies);
        });
    }, [like]);

    return [setLike] as const;
};

export default useLikeAction;
