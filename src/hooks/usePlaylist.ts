import { ErrorResponse } from '../error';
import { PlaylistsResponse, TVMovie } from '../store/types';
import useAuth from './useAuth';

const usePlaylist = () => {
    const { setAccessToken, accessToken, oauth, setOAuth } = useAuth();

    const createPlaylist = async (name: string) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/playlist`, {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: `Bearer ${accessToken}`,
                Authorization: `Bearer ${oauth}`
            },
            method: 'POST',
            body: JSON.stringify({
                name
            })
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        if (res.status === 401) {
            setAccessToken(() => null);
            return 401;
        }
        return await res.json().then((r: { success: true; playlists: string } | ErrorResponse) => {
            return r;
        });
    };

    const deletePlaylist = async (id: string) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/playlist/${id}`, {
            headers: {
                jwtToken: `Bearer ${accessToken}`,
                Authorization: `Bearer ${oauth}`
            },
            method: 'DELETE'
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        if (res.status === 401) {
            setAccessToken(() => null);
            return 401;
        }
        return await res.json().then((r: { success: true } | ErrorResponse) => {
            return r;
        });
    };

    const addInPlaylist = async (id: string, movies: TVMovie) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/playlists/add/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: `Bearer ${accessToken}`,
                Authorization: `Bearer ${oauth}`
            },
            method: 'POST',
            body: JSON.stringify({
                movies
            })
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        if (res.status === 401) {
            setAccessToken(() => null);
            return 401;
        }
        return await res.json().then((r: { success: true; id: string } | ErrorResponse) => {
            return r;
        });
    };

    const getPlaylistMoveByID = async (id: string) => {
        let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/playlists/movies/${id}`, {
            headers: {
                jwtToken: `Bearer ${accessToken}`,
                Authorization: `Bearer ${oauth}`
            },
            method: 'GET'
        });
        if (res.status === 403) {
            setOAuth(() => null);
            return 403;
        }
        if (res.status === 401) {
            setAccessToken(() => null);
            return 401;
        }
        return await res.json().then((r: PlaylistsResponse) => {
            return r;
        });
    };

    return { createPlaylist, deletePlaylist, addInPlaylist, getPlaylistMoveByID, setOAuth, setAccessToken };
};

export default usePlaylist;
