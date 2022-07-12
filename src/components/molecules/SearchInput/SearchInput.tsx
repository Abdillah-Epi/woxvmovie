import React from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type SearchProps = React.InputHTMLAttributes<HTMLInputElement> & {
    containerClassName?: string;
};

const SearchInput: React.FC<SearchProps> = ({ containerClassName, ...otherProps }) => {
    return (
        <div className='flex h-10 w-full justify-center'>
            <div className={otc(`xl:w-[40%] ${containerClassName}`)}>
                <input {...otherProps} />
            </div>
        </div>
    );
};

export default SearchInput;
