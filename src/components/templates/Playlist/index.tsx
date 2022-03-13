import React from "react";
import navlinks from "../../molecules/Nav/links.json";
import Sidenav from "../../organisms/Sidenav";

type TPlaylistProps = {};

const TPlaylist: React.FC<TPlaylistProps> = ({ children }) => {
    return (
        <section className='h-[100vh] w-screen bg-black sm:h-[70vh] xl:h-screen'>
            {children}
            <div className='fixed top-0 w-[80%]'>
                <Sidenav list={[...navlinks, { path: "/", text: "Déconexion" }]} />
            </div>
        </section>
    );
};

export default TPlaylist;
