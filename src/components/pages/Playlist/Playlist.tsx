import React from 'react';
import useRouteStatus from '../../../hooks/useRouteStatus';
import useUserPlaylists from '../../../hooks/useUserPlaylists';
import PlaylistForm from '../../organisms/PlaylistForm';

type PlaylistProps = {};

const Playlist: React.FC<PlaylistProps> = ({}) => {
    // Check if the user is logged
    useRouteStatus();
    const [err] = useUserPlaylists();

    return <PlaylistForm />;
};

export default Playlist;
