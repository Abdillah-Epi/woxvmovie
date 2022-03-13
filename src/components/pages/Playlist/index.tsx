import React, { Suspense } from "react";
import OPlaylist from "../../organisms/Playlist";
import TPlaylist from "../../templates/Playlist";

type PlaylistProps = {};

const Playlist: React.FC<PlaylistProps> = ({}) => {
    return (
        <TPlaylist>
            <OPlaylist />
        </TPlaylist>
    );
};

export default Playlist;
