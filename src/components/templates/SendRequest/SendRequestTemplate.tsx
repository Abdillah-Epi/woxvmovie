import React from 'react';
import Nav from '../../molecules/Nav';
import Sidenav, { Links } from '../../organisms/Sidenav';
import Cover from '../Cover';

type SendRequestTemplateProps = {
    img?: string;
    links?: Links[];
};

const SendRequestTemplate: React.FC<SendRequestTemplateProps> = ({ children, img, links = [] }) => {
    return (
        <div className='flex h-screen w-screen flex-col overflow-y-scroll bg-black'>
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