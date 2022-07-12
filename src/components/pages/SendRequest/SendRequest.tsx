import React from 'react';
import SendRequestForm from '../../organisms/SendRequestForm';
import SendRequestTemplate from '../../templates/SendRequest';
import cover from '../../../assets/images/cover.webp';

const SendRequest: React.FC = () => {
    return (
        <SendRequestTemplate img={cover} links={[{ path: '/landing', text: 'Home' }]}>
            <SendRequestForm />
        </SendRequestTemplate>
    );
};

export default SendRequest;
