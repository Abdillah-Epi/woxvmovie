import React from "react";
import { useSetRecoilState } from "recoil";
import { isClickedAtomFamily } from "../../../store/button";

type Text = {
    textColor?: string;
    styles?: string;
    textPos?: "center" | "left" | "right" | "between";
};

type Icon = {
    pos: "right" | "left";
    icon: string | null;
    styles?: string;
};

type ButtonProps = {
    text: string;
    textStyles?: Text;
    bgColor?: string;
    onHover?: string;
    styles?: string;
    icon?: Icon;
};

const Button: React.VFC<ButtonProps> = ({
    text,
    textStyles = { textPos: "center", textColor: "text-white" },
    bgColor = "bg-woxvmoie-3",
    onHover = "hover:bg-woxvmoie-2",
    styles = "",
    icon = null
}) => {
    const click = useSetRecoilState(isClickedAtomFamily(text));

    return (
        <div
            onClick={() => click(() => true)}
            className={`flex items-center ${
                textStyles.textPos === "center"
                    ? "justify-center"
                    : textStyles.textPos === "left"
                    ? "justify-start"
                    : textStyles.textPos === "right"
                    ? "justify-end"
                    : "justify-between"
            } h-full w-full cursor-pointer space-x-2 p-3 ${bgColor} ${onHover} ${styles}`}
        >
            {icon?.icon && icon.pos === "left" && (
                <img className={`${icon.styles ? icon.styles : "h-3 w-3"}`} src={icon.icon} />
            )}
            <p className={`sm:text-sm ${textStyles.textColor} ${textStyles.styles}`}>{text}</p>
            {icon?.icon && icon.pos === "right" && (
                <img className={`${icon.styles ? icon.styles : "h-3 w-3"}`} src={icon.icon} />
            )}
        </div>
    );
};

export default Button;
