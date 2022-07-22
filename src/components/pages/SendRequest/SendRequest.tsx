import React from 'react';
import SendRequestForm from '../../organisms/SendRequestForm';
import SendRequestTemplate from '../../templates/SendRequest';
import cover from '../../../assets/images/cover.jpeg';
import useRouteStatus from '../../../hooks/useRouteStatus';

const SendRequest: React.FC = () => {
    // Check if the user is logged
    useRouteStatus('success', '/app');

    return (
        <SendRequestTemplate img={cover} links={[{ path: '/signin', text: 'Home' }]}>
            <SendRequestForm />
        </SendRequestTemplate>
    );
};

export default SendRequest;
