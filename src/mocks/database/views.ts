import { TVMovie } from '../../store/types';

export const Views: TVMovie[] = [];

export const UpdateViews = (payload: TVMovie) => {
    Views.push(payload);
};
