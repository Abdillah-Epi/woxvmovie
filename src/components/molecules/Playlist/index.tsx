import React from "react";
import Logo from "../../atoms/Logo";
import Regular from "../../atoms/Typography/Regular";
import plus from "../../../assets/images/plus.svg";

type PlaylistProps = {
    text: string;
    fontSize?: string;
    styles?: string;
};

const Playlist: React.FC<PlaylistProps> = ({ text, styles, fontSize }) => {
    return (
        <div
            className={`flex w-[100%] transform cursor-pointer items-center justify-between rounded-md bg-white p-2 transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg xl:p-4 ${styles}`}
        >
            <div className='flex items-center'>
                <Logo />
                <Regular fontSize={fontSize ? fontSize : "text-xs sm:text-base"} text={text} color={""} />
            </div>
            <img src={plus} className={"h-4 w-4"} alt='' />
        </div>
    );
};

export default Playlist;
