import React from 'react';
import SignupForm from '../../organisms/SignUpForm';
import SignupTemplate from '../../templates/Signup';
import cover from '../../../assets/images/cover.jpeg';
import useRouteStatus from '../../../hooks/useRouteStatus';

const Signup: React.FC = () => {
    // Check if the user is logged
    useRouteStatus('success', '/app');

    return (
        <SignupTemplate
            img={cover}
            links={[
                { path: '/signin', text: 'Home' },
                { path: '/signin', text: 'Signin' }
            ]}
        >
            <SignupForm />
        </SignupTemplate>
    );
};

export default Signup;
