import React from "react";
import { useSetRecoilState } from "recoil";
import { isClickedAtomFamily } from "../../../../store/button";

type HeaderProps = {
    text: string;
    color: string;
    fontSize?: string;
    styles?: string;
};

const Header: React.VFC<HeaderProps> = ({ text, color, fontSize = "sm:text-5xl xl:text-7xl  text-3xl", styles }) => {
    const click = useSetRecoilState(isClickedAtomFamily(text));

    return (
        <div onClick={() => click(() => true)} className={`font-black ${fontSize} ${color} ${styles}`}>
            {text}
        </div>
    );
};

export default Header;
