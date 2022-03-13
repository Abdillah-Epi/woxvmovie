import { atomFamily } from "recoil";

export const isClickedAtomFamily = atomFamily<boolean, string>({
    key: "isClickedAtomFamily",
    default: false
});
