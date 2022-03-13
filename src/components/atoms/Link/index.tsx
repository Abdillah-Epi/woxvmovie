import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isClickedAtomFamily } from "../../../store/button";

type Icon = {
    icon: string;
    pos: "left" | "right";
    styles?: string;
};

type LinkProps = {
    text: string;
    color: string;
    id: string;
    path: string | null;
    icon?: Icon | null;
    styles?: string;
};

const Link: React.FC<LinkProps> = ({ text, path, color, id, icon = null, styles }) => {
    const navigate = useNavigate();
    const click = useSetRecoilState(isClickedAtomFamily(id));

    return (
        <div>
            <div
                onClick={() => {
                    path && navigate(path);
                    click(() => true);
                }}
                className={`flex cursor-pointer items-center space-x-3 ${styles}`}
            >
                {icon?.pos === "left" && (
                    <span className={`${icon.styles}`}>
                        <img src={icon.icon} alt='' />
                    </span>
                )}
                <p className={`${color}`}>{text}</p>
                {icon?.pos === "right" && (
                    <span className={`${icon.styles}`}>
                        <img src={icon.icon} alt='' />
                    </span>
                )}
            </div>
        </div>
    );
};

export default Link;
