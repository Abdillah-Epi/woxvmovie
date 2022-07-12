import React from 'react';
import ResetPasswordForm from '../../organisms/ResetPasswordForm';
import ResetPasswordTemplate from '../../templates/ResetPassword';
import cover from '../../../assets/images/cover.webp';

const ResetPassword: React.FC = () => {
    return (
        <ResetPasswordTemplate
            img={cover}
            links={[
                { path: '/landing', text: 'Home' },
                { path: '/signup', text: 'Signup' }
            ]}
        >
            <ResetPasswordForm />
        </ResetPasswordTemplate>
    );
};

export default ResetPassword;
