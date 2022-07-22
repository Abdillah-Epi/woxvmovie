import React from 'react';
import SigninForm from '../../organisms/SignInForm';
import SigninTemplate from '../../templates/Signin';
import cover from '../../../assets/images/cover.jpeg';
import useRouteStatus from '../../../hooks/useRouteStatus';

const Signin: React.FC = () => {
    // Check if the user is logged
    useRouteStatus('success', '/app');

    return (
        <SigninTemplate
            img={cover}
            links={[
                { path: '/signin', text: 'Home' },
                { path: '/signup', text: 'Signup' }
            ]}
        >
            <SigninForm />
        </SigninTemplate>
    );
};

export default Signin;
