import { atom } from 'recoil';

export const EmailAtom = atom<string>({
    key: 'EmailAtom',
    default: ''
});
