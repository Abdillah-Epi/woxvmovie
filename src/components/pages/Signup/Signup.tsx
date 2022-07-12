import React from 'react';
import SignupForm from '../../organisms/SignUpForm';
import SignupTemplate from '../../templates/Signup';
import cover from '../../../assets/images/cover.webp';

const Signup: React.FC = () => {
    return (
        <SignupTemplate
            img={cover}
            links={[
                { path: '/landing', text: 'Home' },
                { path: '/signin', text: 'Signin' }
            ]}
        >
            <SignupForm />
        </SignupTemplate>
    );
};

export default Signup;
