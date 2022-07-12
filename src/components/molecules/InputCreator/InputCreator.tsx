import React from 'react';
import Button from '../../atoms/Button';

type InputCreatorProps = React.InputHTMLAttributes<HTMLInputElement> & {
    classNameBtn?: string;
    titleBtn: string;
    submitCallback?: () => void;
    type: string;
};

const InputCreator = ({ classNameBtn, titleBtn, submitCallback, ...otherProps }: InputCreatorProps) => {
    return (
        <div className='flex h-10 w-full'>
            <div className='w-[60%] xl:w-[70%]'>
                <input
                    className='text-grey-darker h-full w-full appearance-none border pl-5 focus:outline-none'
                    {...otherProps}
                />
            </div>

            <div className='w-[40%] xl:w-[30%]'>
                <Button onClick={() => submitCallback?.()} className={classNameBtn} title={titleBtn} theme='primary' />
            </div>
        </div>
    );
};

export default InputCreator;
