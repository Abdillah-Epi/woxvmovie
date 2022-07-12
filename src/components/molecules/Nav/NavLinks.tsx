import { Link } from '@tanstack/react-location';
import { NavItemAnimation, NavLinksAnimation } from './motion';

type NavLinksProps = {
    links?: {
        text: string;
        color: string;
        path: string;
        styles: string;
    }[];
};

const NavLinks: React.FC<NavLinksProps> = ({ children, links }) => {
    return (
        <NavLinksAnimation className='flex items-center space-x-20'>
            {children}
            <div className='flex space-x-8'>
                {links?.map((link, key) => {
                    return (
                        <NavItemAnimation key={key} myKey={key}>
                            <Link className='text-white' to={link.path}>
                                {link.text}
                            </Link>
                        </NavItemAnimation>
                    );
                })}
            </div>
        </NavLinksAnimation>
    );
};

export default NavLinks;
