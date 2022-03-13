import React from "react";
import { useSetRecoilState } from "recoil";
import { isClickedAtomFamily } from "../../../../store/button";

type RegularProps = {
    text: string;
    color: string;
    fontSize?: string;
    styles?: string;
};

const Regular: React.VFC<RegularProps> = ({ color, text, fontSize, styles }) => {
    const click = useSetRecoilState(isClickedAtomFamily(text));

    return (
        <div onClick={() => click(() => true)} className={`${fontSize} ${color} ${styles}`}>
            {text}
        </div>
    );
};

export default Regular;
