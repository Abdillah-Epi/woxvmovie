import React from 'react';
import Nav from '../../molecules/Nav';
import Sidenav from '../../organisms/Sidenav';
import { Links } from '../../organisms/Sidenav/Sidenav';
import Cover from '../Cover';

type SendRequestTemplateProps = React.HTMLAttributes<HTMLDivElement> & {
    img?: string;
    links?: Links[];
};

const SendRequestTemplate: React.FC<SendRequestTemplateProps> = ({ children, img, links = [] }) => {
    return (
        <div className='flex h-screen w-screen flex-col overflow-y-scroll bg-[#141414]'>
            <Cover img={img} className='p-10'>
                <Nav />
                {children}
            </Cover>
            <div className='fixed top-0 w-[80%]'>
                <Sidenav links={links} />
            </div>
        </div>
    );
};

export default SendRequestTemplate;
