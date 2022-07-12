import { ErrorAccess, ErrorResponse } from '../error';
import { ActionPlaylistsResponse, PlaylistsResponse, TVMovie } from '../store/types';

const url = process.env.VITE_API_URL as string;

type AddInPlaylistProps = {
    id: string;
    movie: TVMovie;
    on: string;
    access_token: string;
    oauth_token: string;
};

export const AddInPlaylist = async ({ id, movie, access_token, oauth_token, on }: AddInPlaylistProps) => {
    let res: Response = await fetch(`${url}/v1/api/app/playlists/add/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'PUT',
        body: JSON.stringify({
            movies: movie,
            on: on
        })
    });
    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;
    return await res.json().then((res: ActionPlaylistsResponse) => {
        return res;
    });
};

export const RemoveFromPlaylist = async (id: string, mid: number, access_token: string, oauth_token: string) => {
    const res: Response = await fetch(`${process.env.VITE_API_URL}/v1/api/app/playlists/remove/${id}/${mid}`, {
        headers: {
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'PUT'
    });
    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;
    return await res.json().then((res: ActionPlaylistsResponse) => {
        return res;
    });
};

export const GetPlaylistMoveByID = async (id: string, access_token: string, oauth_token: string) => {
    let res = await fetch(`${url}/v1/api/app/playlists/movies/${id}`, {
        headers: {
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'GET'
    });
    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;
    return await res.json().then((r: PlaylistsResponse) => {
        return r;
    });
    // const res = await response.json().then((res: PlaylistsResponse) => {
    //     if (res.success) {
    //         if (!res.movies) return [];
    //         const arr = res.movies.map(m => m.id);
    //         const r = res.movies.filter(({ id }, index) => !arr.includes(id, index + 1));
    //         return r;
    //     } else {
    //         return null;
    //     }
    // });
};

export const DeletePlaylist = async (id: string, access_token: string, oauth_token: string) => {
    let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/playlist/${id}`, {
        headers: {
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'DELETE'
    });
    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;
    return await res.json().then((r: { success: true } | ErrorResponse) => {
        return r;
    });
};

export const CreatePlaylist = async (name: string, access_token: string, oauth_token: string) => {
    let res = await fetch(`${process.env.VITE_API_URL}/v1/api/app/playlist`, {
        headers: {
            'Content-Type': 'application/json',
            jwtToken: `Bearer ${access_token}`,
            Authorization: `Bearer ${oauth_token}`
        },
        method: 'POST',
        body: JSON.stringify({
            name
        })
    });
    if (res.status === 403) return ErrorAccess.FORBIDDEN;
    if (res.status === 401) return ErrorAccess.UNAUTHORIZED;
    return await res.json().then((r: { success: true; id: string } | ErrorResponse) => {
        return r;
    });
};
