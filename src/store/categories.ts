import data from './genres.json';
import { atom } from 'recoil';

export type CategoriesData = {
    id: number;
    name: string;
    poster: string;
    backdrop: string;
};

const list: CategoriesData[] = data;

export const categoriesSelectedAtom = atom<CategoriesData[]>({
    key: 'categoriesSelectedAtom',
    default: []
});

export const categoriesAtom = atom<CategoriesData[]>({
    key: 'categoriesAtom',
    default: list
});
