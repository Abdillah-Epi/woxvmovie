import React from "react";

type BodyProps = {
    text: string;
    color: string;
    fontSize?: string;
};

const Body: React.VFC<BodyProps> = ({ text, color, fontSize = "text-xs sm:text-xl" }) => {
    return <div className={`font-semibold ${fontSize} ${color}`}>{text}</div>;
};

export default Body;
