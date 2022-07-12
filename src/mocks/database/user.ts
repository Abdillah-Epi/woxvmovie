import { TVMovie } from '../../store/types';

export type UserAuth = {
    email: string;
    genres: string[];
    id: string;
    password: string;
};

export const CurrentUser: UserAuth = {
    email: 'woxv@gmail.com',
    genres: ['Comedy', 'Animation', 'Crime', 'Action'],
    id: '50b04f77-0c5e-48c3-a68e-67542c6d38d4',
    password: '123456'
};

export const usersDB: UserAuth[] = [
    {
        email: 'woxv@gmail.com',
        genres: ['Comedy', 'Animation', 'Crime', 'Action'],
        id: '50b04f77-0c5e-48c3-a68e-67542c6d38d4',
        password: '123456'
    }
];

export type Playlist = {
    id: string;
    name: string;
    data: TVMovie[];
};

export var playlistDB: Playlist[] = [];

export const CreatePlaylist = (id: string, name: string) => {
    playlistDB.push({ id, name, data: [] });

    return id;
};

export const GetPlaylistById = (id: string) => {
    const p = playlistDB.find(p => p.id === id);

    return p;
};

export const AddPlaylist = (
    movies: TVMovie,
    on: 'movie' | 'tv' | 'top-tv' | 'top-movie' | 'suggestion',
    id: string
) => {
    for (const playlist of playlistDB) {
        if (playlist.id === id) {
            playlist.data.push({ ...movies, on: on });
        }
    }

    return playlistDB;
};

export const DeletePlaylist = (id: string) => {
    playlistDB = playlistDB.filter(p => p.id !== id);

    return playlistDB;
};
