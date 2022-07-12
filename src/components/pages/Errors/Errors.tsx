import React from 'react';
import ErrorsTemplate from '../../templates/Errors';
import img_400 from '../../../assets/images/400.svg';
import img_500 from '../../../assets/images/500.svg';
import { useMatch } from '@tanstack/react-location';
import { LocationGenerics } from '../../../router';

const Errors: React.FC = () => {
    const param = useMatch<LocationGenerics>().params;

    return (
        <ErrorsTemplate>
            <img src={param.code === '400' ? img_400 : img_500} alt='' className='h-[80%] w-[80%]' />
        </ErrorsTemplate>
    );
};

export default Errors;
