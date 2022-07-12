import React from 'react';
import SigninForm from '../../organisms/SignInForm';
import SigninTemplate from '../../templates/Signin';
import cover from '../../../assets/images/cover.webp';

const Signin: React.FC = () => {
    return (
        <SigninTemplate
            img={cover}
            links={[
                { path: '/landing', text: 'Home' },
                { path: '/signup', text: 'Signup' }
            ]}
        >
            <SigninForm />
        </SigninTemplate>
    );
};

export default Signin;
