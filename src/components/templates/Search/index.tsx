import React from "react";
import QuickPlaylist from "../../organisms/QuickPlaylist";
import navlinks from "../../molecules/Nav/links.json";
import Sidenav from "../../organisms/Sidenav";

const TSearch: React.FC = ({ children }) => {
    return (
        <section className='sticky h-[100vh] w-screen bg-black sm:h-[70vh] xl:h-screen'>
            {children}
            <div className='fixed top-0 w-[80%]'>
                <Sidenav list={[...navlinks, { path: "/", text: "Déconexion" }]} />
            </div>
            <QuickPlaylist />
        </section>
    );
};

export default TSearch;
