import React from 'react';
import Sidenav, { Links } from '../../organisms/Sidenav';
import Cover from '../Cover';
import { overrideTailwindClasses as otc } from 'tailwind-override';
import Hero from '../../organisms/Hero';

type LandingPageProps = React.HTMLAttributes<HTMLDivElement> & {
    links: Links[];
    cover?: string;
};

const LandingPage: React.FC<LandingPageProps> = ({ children, links, cover, className, ...otherProps }) => {
    return (
        <div className={otc(`sticky flex flex-col overflow-y-scroll bg-black ${className}`)} {...otherProps}>
            <div className='h-screen w-screen'>
                <Cover img={cover}>
                    <Hero />
                </Cover>
            </div>
            {children}
            <div className='fixed top-0 w-[80%]'>
                <Sidenav links={links} />
            </div>
        </div>
    );
};

export default LandingPage;
