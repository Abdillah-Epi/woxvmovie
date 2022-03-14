import React from 'react';
import Sidenav from '../../organisms/Sidenav';

type TSigninProps = {};

const TSignin: React.FC<TSigninProps> = ({ children }) => {
    return (
        <div className='flex flex-col overflow-y-scroll bg-black'>
            {children}
            <div className='fixed top-0 w-[80%]'>
                <Sidenav
                    list={[
                        { path: '/', text: 'Home' },
                        { path: '/signup', text: 'Signup' }
                    ]}
                />
            </div>
        </div>
    );
};

export default TSignin;
