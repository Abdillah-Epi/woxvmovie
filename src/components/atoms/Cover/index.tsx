import React from "react";

type CoverProps = {
    img: string | null;
};

const Cover: React.VFC<CoverProps> = ({ img = null }) => {
    return <div style={{ backgroundImage: `url(${img})` }} className='h-full w-full bg-cover bg-center'></div>;
};

export default Cover;
