import React from "react";

type SubHeaderProps = {
    text: string;
    color: string;
    fontSize?: string;
    styles?: string;
};

const SubHeader: React.VFC<SubHeaderProps> = ({ text, color, fontSize = "sm:text-3xl text-lg", styles }) => {
    return (
        <div className={`font-bold ${fontSize} ${color} ${styles}`}>
            <p>{text}</p>
        </div>
    );
};

export default SubHeader;
