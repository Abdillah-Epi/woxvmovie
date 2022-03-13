import React from "react";
import QuickPlaylist from "../../organisms/QuickPlaylist";
import Sidenav from "../../organisms/Sidenav";
import navlinks from "../../molecules/Nav/links.json";

const TFavorites: React.FC = ({ children }) => {
    return (
        <div className='sticky w-screen bg-black'>
            {children}
            <div className='fixed top-0 w-[80%]'>
                <Sidenav list={[...navlinks, { path: "/", text: "Déconexion" }]} />
            </div>
            <QuickPlaylist />
        </div>
    );
};

export default TFavorites;
