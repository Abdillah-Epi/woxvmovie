import React from "react";
import { useRecoilState } from "recoil";
import { InputAtomFamily } from "../../../store/inputs";

type Icon = {
    icon: string;
    pos: "in:left" | "in:right" | "out:left" | "out:right";
    styles?: string;
    callback?: any | null;
};

type InputProps = {
    type: string;
    id: string;
    placeHolder?: string;
    icon?: Icon | null;
    styles?: string;
    callback?: any | null;
};

const Input: React.VFC<InputProps> = ({ placeHolder, id, type, icon = null, callback, styles }) => {
    const [text, setText] = useRecoilState(InputAtomFamily(id));

    return (
        <>
            <div className={`flex w-full items-center ${text.error ? "h-4/5" : "h-full"}`}>
                {icon?.icon && icon.pos === "out:left" && <img className={`h-4 w-4 ${styles}`} src={icon.icon} />}
                <div className='relative h-full w-full'>
                    {icon?.icon && icon.pos === "in:left" && (
                        <img className={`absolute left-3 top-3 h-4 w-4 ${styles}`} src={icon.icon} />
                    )}
                    {icon?.icon && icon.pos === "in:right" && (
                        <img className={`absolute right-3 top-3 h-4 w-4 ${styles}`} src={icon.icon} />
                    )}
                    <input
                        value={text.value}
                        id={id}
                        type={type}
                        onChange={e => setText(c => ({ ...c, value: e.target.value }))}
                        placeholder={placeHolder}
                        className={`text-grey-darker h-full w-full appearance-none border ${styles} ${
                            icon?.icon && icon.pos === "in:left" ? "pl-10" : "pl-5"
                        }`}
                    />
                </div>
                {icon?.icon && icon.pos === "out:right" && <img className={`h-4 w-4 ${styles}`} src={icon.icon} />}
            </div>
            {text.error && <div className='h-[30%] w-full font-light text-red-500'>{text.error}</div>}
        </>
    );
};

export default Input;
