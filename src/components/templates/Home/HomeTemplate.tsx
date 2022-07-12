import React from 'react';

import PlaylistModal from '../../organisms/PlaylistModal';
import Sidenav from '../../organisms/Sidenav';
import navlinks from '../../molecules/Nav/links.json';

const HomeTemplate: React.FC = ({ children }) => {
    return (
        <div className='sticky w-screen bg-black'>
            {children}
            <div className='fixed top-0 w-[80%]'>
                <Sidenav links={[...navlinks, { path: '/app', text: 'Logout' }]} />
            </div>
            <PlaylistModal />
        </div>
    );
};

export default HomeTemplate;
