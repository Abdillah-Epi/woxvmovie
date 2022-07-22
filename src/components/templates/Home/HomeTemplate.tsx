import React from 'react';

import PlaylistModal from '../../organisms/PlaylistModal';
import Sidenav from '../../organisms/Sidenav';
import navlinks from '../../molecules/Nav/links.json';

type HomeTemplateProps = React.HTMLAttributes<HTMLDivElement>;

const HomeTemplate: React.FC<HomeTemplateProps> = ({ children }) => {
    return (
        <div className='sticky w-screen bg-[#141414]'>
            {children}
            <div className='fixed top-0 w-[80%]'>
                <Sidenav links={[...navlinks, { path: '/signin', text: 'Logout' }, {path: '/signup', text: 'Delete account'}]} />
            </div>
            <PlaylistModal />
        </div>
    );
};

export default HomeTemplate;
