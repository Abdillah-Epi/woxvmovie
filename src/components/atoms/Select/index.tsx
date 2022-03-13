import React from "react";

type Icon = {
    icon: string;
    pos: "in:left" | "in:right" | "out:left" | "out:right";
    styles?: string;
    callback?: any | null;
};

type SelectProps = {
    placeHolder?: string;
    icon?: Icon | null;
    styles?: string;
    callback?: any | null;
    list: string[];
};

const Select: React.VFC<SelectProps> = ({ placeHolder, icon = null, callback, styles, list }) => {
    return (
        <div className={`flex h-full w-full items-center`}>
            {icon?.icon && icon.pos === "out:left" && <img className={`${styles} h-3 w-3`} src={icon.icon} />}
            <div className='relative h-full w-full'>
                {icon?.icon && icon.pos === "in:left" && (
                    <img className={`absolute left-3 top-3 h-3 w-3 ${styles}`} src={icon.icon} />
                )}
                {icon?.icon && icon.pos === "in:right" && (
                    <img className={`absolute right-3 top-3 h-3 w-3 ${styles}`} src={icon.icon} />
                )}
                <select
                    placeholder={placeHolder}
                    className={`text-grey-darker h-full w-full cursor-pointer appearance-none border py-1 ${styles} ${
                        icon?.icon && icon.pos === "in:left" ? "pl-10" : "pl-5"
                    }`}
                >
                    {list.length &&
                        list.map((elem, key) => {
                            return <option key={key}>{elem}</option>;
                        })}
                </select>
            </div>
            {icon?.icon && icon.pos === "out:right" && <img className={`${styles} h-3 w-3`} src={icon.icon} />}
        </div>
    );
};

export default Select;
