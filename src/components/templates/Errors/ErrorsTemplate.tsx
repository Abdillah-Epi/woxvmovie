import React from 'react';
import Sidenav from '../../organisms/Sidenav';
import links from '../../molecules/Nav/links.json';
import Nav from '../../molecules/Nav';

const ErrorsTemplate: React.FC = ({ children }) => {
    return (
        <section className='sticky h-[100vh] w-screen bg-black sm:h-[70vh] xl:h-screen'>
            <div className='space-y h-full w-full overflow-y-scroll bg-black/80  p-10'>
                <div className='h-[10%]'>
                    <Nav links={links} />
                </div>
                {children}
            </div>
            <div className='fixed top-0 w-[80%]'>
                <Sidenav links={[...links, { path: '/', text: 'Accueil' }]} />
            </div>
        </section>
    );
};

export default ErrorsTemplate;
