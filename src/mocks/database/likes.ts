import { TVMovie } from '../../store/types';
import { Action } from './movies/action';

export let Likes: TVMovie[] = [];

export const UpdateLikes = (payload: TVMovie, action: 'like' | 'unlike') => {
    if (action === 'like') {
        Likes.push(payload);
    } else {
        Likes = Likes.filter(like => like.id !== payload.id);
    }

    return Likes;
};
