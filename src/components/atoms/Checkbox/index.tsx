import React from "react";

type CheckboxProps = {
    span?: string;
    pos?: "left" | "right";
    spanColor?: string;
    color?: string;
    styles?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ span, pos = "right", spanColor, color = "", styles }) => {
    return (
        <div className={`flex items-center space-x-3 ${styles}`}>
            {pos === "left" && <span className={`${spanColor}`}>{span}</span>}
            <input type={"checkbox"} className={`h-5 w-5 ${color}`} />
            {pos === "right" && <span className={`${spanColor}`}>{span}</span>}
        </div>
    );
};

export default Checkbox;
