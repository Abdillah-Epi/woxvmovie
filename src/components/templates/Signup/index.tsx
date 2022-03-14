import React from 'react';
import Sidenav from '../../organisms/Sidenav';

type TSignupProps = {};

const TSignup: React.FC<TSignupProps> = ({ children }) => {
    return (
        <div className='flex flex-col overflow-y-scroll bg-black'>
            {children}
            <div className='fixed top-0 w-[80%]'>
                <Sidenav
                    list={[
                        { path: '/', text: 'Home' },
                        { path: '/signin', text: 'Signin' }
                    ]}
                />
            </div>
        </div>
    );
};

export default TSignup;
