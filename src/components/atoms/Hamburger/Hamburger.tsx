import { motion, useAnimation } from 'framer-motion';
import React from 'react';
import { useRecoilState } from 'recoil';
import { SideNavAtom } from '../../../store/nav';
import { path01Variants, path02Variants } from './motion';

type HamburgerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Hamburger: React.FC<HamburgerProps> = ({ ...props }) => {
    const [isOpen, OpenSideNav] = useRecoilState(SideNavAtom);
    const path01Controls = useAnimation();
    const path02Controls = useAnimation();

    const onClick = async () => {
        OpenSideNav(!isOpen);
        if (!isOpen) {
            await path02Controls.start(path02Variants.moving);
            path01Controls.start(path01Variants.open);
            path02Controls.start(path02Variants.open);
        } else {
            path01Controls.start(path01Variants.closed);
            await path02Controls.start(path02Variants.moving);
            path02Controls.start(path02Variants.closed);
        }
    };

    return (
        <button {...props} onClick={onClick}>
            <svg width='24' height='24' viewBox='0 0 24 24'>
                <motion.path
                    {...path01Variants.closed}
                    animate={path01Controls}
                    transition={{ duration: 0.2 }}
                    stroke='#FFFFFF'
                />
                <motion.path
                    {...path02Variants.closed}
                    animate={path02Controls}
                    transition={{ duration: 0.2 }}
                    stroke='#FFFFFF'
                />
            </svg>
        </button>
    );
};

export default Hamburger;
