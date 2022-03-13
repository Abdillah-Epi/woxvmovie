import React from "react";
import Logo from "../../atoms/Logo";
import Regular from "../../atoms/Typography/Regular";
import plus from "../../../assets/images/plus.svg";

type QuestionProps = {
    text: string;
};

const Question: React.FC<QuestionProps> = ({ text }) => {
    return (
        <div className='text- flex h-[100%] w-[100%] transform cursor-pointer items-center justify-between rounded-md bg-white p-4 transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg'>
            <div className='flex items-center'>
                <Logo />
                <Regular fontSize='text-xs sm:text-base' text={text} color={""} />
            </div>
            <img src={plus} className={"h-4 w-4"} alt='' />
        </div>
    );
};

export default Question;
