import { atomFamily } from "recoil";

export const InputAtomFamily = atomFamily<{ value: string; error: string | null }, string>({
    key: "InputAtomFamily",
    default: { value: "", error: null }
});
