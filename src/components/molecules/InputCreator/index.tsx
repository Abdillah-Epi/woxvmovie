import React, { useEffect } from 'react';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import arrowr from '../../../assets/images/arrowr.svg';
import { useNavigate } from 'react-router-dom';
import { isClickedAtomFamily } from '../../../store/button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputAtomFamily } from '../../../store/inputs';

type InputCreatorProps = {
    type?: string;
    id?: string;
    btn?: string;
    placeHolder?: string;
};

const InputCreator: React.FC<InputCreatorProps> = ({
    type = 'email',
    id = 'email-signup',
    placeHolder = 'E-mail',
    btn = 'Get started'
}) => {
    const [isClicked, resetClick] = useRecoilState(isClickedAtomFamily('Get started'));
    const navigate = useNavigate();
    const email = useRecoilValue(InputAtomFamily('email-signup'));

    useEffect(() => {
        if (!isClicked) return;
        if (email.value === '') return;
        resetClick(() => false);
        navigate('/signup');
    }, [isClicked]);

    return (
        <div className='flex h-10 w-full'>
            <div className='w-[60%] xl:w-[70%]'>
                <Input type={type} id={id} placeHolder={placeHolder} />
            </div>

            <div className='w-[40%] xl:w-[30%]'>
                <Button text={btn} icon={{ icon: arrowr, pos: 'right' }} />
            </div>
        </div>
    );
};

export default InputCreator;
