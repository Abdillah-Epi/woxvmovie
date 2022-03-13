import React from "react";
import Input from "../../atoms/Input";

type SearchProps = {};

const MSearch: React.FC<SearchProps> = ({}) => {
    return (
        <div className='flex h-10 w-full justify-center'>
            <div className='xl:w-[40%]'>
                <Input styles='rounded-lg' type={"text"} id={"search"} placeHolder={"Search"} />
            </div>
        </div>
    );
};

export default MSearch;
