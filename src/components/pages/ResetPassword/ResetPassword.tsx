import React from 'react';
import ResetPasswordForm from '../../organisms/ResetPasswordForm';
import ResetPasswordTemplate from '../../templates/ResetPassword';
import cover from '../../../assets/images/cover.jpeg';
import useRouteStatus from '../../../hooks/useRouteStatus';

const ResetPassword: React.FC = () => {
    // Check if the user is logged
    useRouteStatus('success', '/app');

    return (
        <ResetPasswordTemplate
            img={cover}
            links={[
                { path: '/signin', text: 'Home' },
                { path: '/signup', text: 'Signup' }
            ]}
        >
            <ResetPasswordForm />
        </ResetPasswordTemplate>
    );
};

export default ResetPassword;
