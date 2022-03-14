import { atom, atomFamily, DefaultValue, selector, selectorFamily } from 'recoil';
import { AccessTokenAtom } from './auth';
import { OAuthAtom } from './authorization';
import data from './genres.json';
import {
    TVMovieResponse,
    TVMovie,
    Videos,
    VideosResponse,
    ViewsResponse,
    PlaylistsIDs,
    PlaylistsIDsResponse,
    PlaylistsResponse,
    ActionPlaylistsResponse
} from './types';
import { UserAtom } from './user';

export type CategoriesData = {
    id: number;
    name: string;
    poster: string;
    backdrop: string;
};

const list: CategoriesData[] = data;

export const movieHoveredAtom = atom<string | null>({
    key: 'movieHoveredAtom',
    default: null
});

export const movieSelectedAtom = atom<TVMovie | null>({
    key: 'movieSelectedAtom',
    default: null
});

export const categoriesSelectedAtom = atom<CategoriesData[]>({
    key: 'categoriesSelectedAtom',
    default: []
});

export const TopsTraindingAtom = atom<TVMovie[]>({
    key: 'TopsTraindingAtom',
    default: []
});

export const MoviesAtomFamily = atomFamily<TVMovie | null, number>({
    key: 'MoviesAtomFamily',
    default: null
});

export const cleanMovieSelector = selector({
    key: 'cleanMovieSelector',
    set: ({ set }) => {
        set(categoriesSelectedAtom, []);
        set(movieSelectedAtom, null);
        set(TopsTraindingAtom, []);
        set(movieHoveredAtom, null);
    },
    get: () => ''
});

export const categoriesAtom = atom<CategoriesData[]>({
    key: 'categoriesAtom',
    default: list
});

const getTVMovie = async (
    c: string,
    oauth_token: string,
    access_token: string,
    ch: string = 'popular'
): Promise<TVMovie[] | null | number> => {
    const url = process.env.VITE_API_URL as string;

    let response: Response = await fetch(`${url}/v1/api/app/${ch}/${c}`, {
        headers: {
            Authorization: `Bearer ${oauth_token}`,
            jwtToken: `Bearer ${access_token}`
        },
        method: 'GET'
    });
    if (response.status === 403 || response.status === 401) {
        return response.status;
    }
    let res = await response.json().then((res: TVMovieResponse) => {
        if (res.success) {
            return res.movies;
        } else {
            return null;
        }
    });
    return res;
};

export const MoviesSelectorFamily = selectorFamily<TVMovie[] | null | number, { genre: string; path: string }>({
    key: 'MoviesSelectorFamily',
    get:
        ({ genre, path }) =>
        async ({ get }) => {
            const oauth_token = get(OAuthAtom);
            const access_token = get(AccessTokenAtom);

            if (!oauth_token || !access_token || access_token === 'refresh') return null;
            const res = await getTVMovie(genre, oauth_token, access_token, path);

            return res;
        }
});

export const TopsTraindingSelectorFamily = selectorFamily<TVMovie[] | null | number, string>({
    key: 'TopsTraindingSelectorFamily',
    get:
        (path: string) =>
        async ({ get }) => {
            const oauth_token = get(OAuthAtom);
            const access_token = get(AccessTokenAtom);

            if (!oauth_token || !access_token || access_token === 'refresh') return null;

            const url = process.env.VITE_API_URL as string;

            let response: Response = await fetch(`${url}/v1/api/app/${path}`, {
                headers: {
                    Authorization: `Bearer ${oauth_token}`,
                    jwtToken: `Bearer ${access_token}`
                },
                method: 'GET'
            });
            if (response.status === 403 || response.status === 401) {
                return response.status;
            }
            const res = await response.json().then((res: TVMovieResponse) => {
                if (res.success) {
                    return res.movies;
                } else {
                    return null;
                }
            });
            return res;
        }
});

export const VideoSelector = selectorFamily<Videos | null | number, number>({
    key: 'VideoSelector',
    get:
        (id: number) =>
        async ({ get }) => {
            const oauth_token = get(OAuthAtom);
            const access_token = get(AccessTokenAtom);
            const user = get(UserAtom);

            if (!oauth_token || !access_token || access_token === 'refresh') return null;
            if (!user) return null;

            const url = process.env.VITE_API_URL as string;

            let response: Response = await fetch(`${url}/v1/api/app/video/${id}`, {
                headers: {
                    Authorization: `Bearer ${oauth_token}`,
                    jwtToken: `Bearer ${access_token}`
                },
                method: 'GET'
            });
            if (response.status === 403 || response.status === 401) {
                return response.status;
            }
            const res = await response.json().then((res: VideosResponse) => {
                if (res.success) {
                    return res.video;
                } else {
                    return null;
                }
            });
            return res;
        }
});

export const ViewsAtom = atom<TVMovie[]>({
    key: 'ViewsAtom',
    default: []
});

export const ViewsAtomFamily = atomFamily<boolean, number>({
    key: 'ViewsAtomFamily',
    default: false
});

export const ViewsSelector = selector<TVMovie[] | null | number>({
    key: 'ViewsSelector',
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);
        const seleckedMovie = get(movieSelectedAtom);

        if (!oauth_token || !access_token || access_token === 'refresh') return null;

        const url = process.env.VITE_API_URL as string;

        let response: Response = await fetch(`${url}/v1/api/app/views`, {
            headers: {
                jwtToken: `Bearer ${access_token}`,
                Authorization: `Bearer ${oauth_token}`
            },
            method: 'GET'
        });
        if (response.status === 403 || response.status === 401) {
            return response.status;
        }
        const res = await response.json().then((res: ViewsResponse) => {
            if (res.success) {
                if (!res.movies) return [];
                const arr = res.movies.map(m => m.id);
                const r = res.movies.filter(({ id }, index) => !arr.includes(id, index + 1));
                return r;
            } else {
                return null;
            }
        });
        return res;
    },
    set: ({ set }, movies) => {
        if (typeof movies === 'number') return;
        if (!movies) return;
        if (movies instanceof DefaultValue) return;
        set(ViewsAtom, movies);
        movies.map(m => {
            set(ViewsAtomFamily(m.id), true);
        });
    }
});

export const FavoritesAtom = atom<TVMovie[]>({
    key: 'FavoritesAtom',
    default: []
});

type Action = 'like' | 'unlike' | 'none';
export const LikeActionAtomFamily = atomFamily<Action, number>({
    key: 'LikeActionAtomFamily',
    default: 'none'
});

export const FavoritesAtomFamily = atomFamily<boolean, number>({
    key: 'FavoritesAtomFamily',
    default: false
});

export const FavoritesSelector = selector<TVMovie[] | null | number>({
    key: 'FavoritesSelector',
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);
        const seleckedMovie = get(movieSelectedAtom);

        if (!oauth_token || !access_token || access_token === 'refresh') return null;

        const url = process.env.VITE_API_URL as string;

        let response: Response = await fetch(`${url}/v1/api/app/favorites`, {
            headers: {
                jwtToken: `Bearer ${access_token}`,
                Authorization: `Bearer ${oauth_token}`
            },
            method: 'GET'
        });
        if (response.status === 403 || response.status === 401) {
            return response.status;
        }
        const res = await response.json().then((res: ViewsResponse) => {
            if (res.success) {
                return res.movies;
            } else {
                return null;
            }
        });
        return res;
    },
    set: ({ set }, movies) => {
        if (typeof movies === 'number') return;
        if (!movies) return;
        if (movies instanceof DefaultValue) return;
        set(FavoritesAtom, movies);
        movies.map(m => {
            set(FavoritesAtomFamily(m.id), true);
        });
    }
});

export const FavoritesSelectorFamily = selectorFamily<TVMovie[] | null | number, { id: number; movie: TVMovie }>({
    key: 'FavoritesSelectorFamily',
    get:
        ({ id, movie }) =>
        async ({ get }) => {
            const oauth_token = get(OAuthAtom);
            const access_token = get(AccessTokenAtom);
            const action = get(LikeActionAtomFamily(id));

            if (!oauth_token || !access_token || access_token === 'refresh' || action === 'none') return null;
            if (action === 'unlike') {
                const list = get(FavoritesAtom);
                if (list.length < 1) return null;
            }

            const payload = action === 'like' ? { movie: movie } : { mid: id };
            const url = process.env.VITE_API_URL as string;

            let response: Response = await fetch(`${url}/v1/api/app/${action}`, {
                headers: {
                    'Content-Type': 'application/json',
                    jwtToken: `Bearer ${access_token}`,
                    Authorization: `Bearer ${oauth_token}`
                },
                method: 'PUT',
                body: JSON.stringify({
                    ...payload
                })
            });
            if (response.status === 403 || response.status === 401) {
                return response.status;
            }
            const res = await response.json().then((res: ViewsResponse) => {
                if (res.success) {
                    return res.movies;
                } else {
                    return null;
                }
            });
            return res;
        }
});

export const PlaylistsAtom = atom<PlaylistsIDs[]>({
    key: 'PlaylistsAtom',
    default: []
});

export const PlaylistsMoviesAtomFamily = atomFamily<TVMovie[], string>({
    key: 'PlaylistsMoviesAtom',
    default: []
});

export const OpenPlaylistMenuAtom = atom<{ state: boolean; id: number }>({
    key: 'OpenPlaylistMenuAtom',
    default: { state: false, id: -1 }
});

export const PlaylistsIDsSelector = selector<PlaylistsIDs[] | null | number>({
    key: 'PlaylistsIDsSelector',
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);
        if (!oauth_token || !access_token || access_token === 'refresh') return null;

        const url = process.env.VITE_API_URL as string;

        let response: Response = await fetch(`${url}/v1/api/app/playlists`, {
            headers: {
                jwtToken: `Bearer ${access_token}`,
                Authorization: `Bearer ${oauth_token}`
            },
            method: 'GET'
        });
        if (response.status === 403 || response.status === 401) {
            return response.status;
        }
        const res = await response.json().then((res: PlaylistsIDsResponse) => {
            if (res.success) {
                return res.playlists;
            } else {
                return null;
            }
        });
        return res;
    },
    set: ({ set }, playlists) => {
        if (typeof playlists === 'number') return;
        if (!playlists) return;
        if (playlists instanceof DefaultValue) return;
        set(PlaylistsAtom, playlists);
    }
});

export const PlaylistsSelectorFamily = selectorFamily<TVMovie[] | null | number, string>({
    key: 'PlaylistsSelectorFamily',
    get:
        (id: string) =>
        async ({ get }) => {
            const oauth_token = get(OAuthAtom);
            const access_token = get(AccessTokenAtom);

            if (!oauth_token || !access_token || access_token === 'refresh') return null;
            if (!id) return null;
            const url = process.env.VITE_API_URL as string;

            let response: Response = await fetch(`${url}/v1/api/app/playlists/movies/${id}`, {
                headers: {
                    jwtToken: `Bearer ${access_token}`,
                    Authorization: `Bearer ${oauth_token}`
                },
                method: 'GET'
            });
            if (response.status === 403 || response.status === 401) {
                return response.status;
            }
            const res = await response.json().then((res: PlaylistsResponse) => {
                if (res.success) {
                    if (!res.movies) return [];
                    const arr = res.movies.map(m => m.id);
                    const r = res.movies.filter(({ id }, index) => !arr.includes(id, index + 1));
                    return r;
                } else {
                    return null;
                }
            });
            return res;
        },
    set:
        (id: string) =>
        ({ set }, movies) => {
            if (typeof movies === 'number') return;
            if (!movies) return;
            if (movies instanceof DefaultValue) return;
            set(PlaylistsMoviesAtomFamily(id), movies);
        }
});

type PlaylistSelected = { movie: TVMovie; id: string; state: true } | { id: string; mid: number; state: false } | null;
export const PlaylistSelectedAtom = atom<PlaylistSelected>({
    key: 'PlaylistSelectedAtom',
    default: null
});

export const AddPlaylistSelector = selector<{ movies: TVMovie[]; id: string } | null | number>({
    key: 'AddPlaylistSelector',
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);
        const data = get(PlaylistSelectedAtom);

        if (!oauth_token || !access_token || access_token === 'refresh' || !data || !data.state) return null;
        const url = process.env.VITE_API_URL as string;

        let response: Response = await fetch(`${process.env.VITE_API_URL}/v1/api/app/playlists/add/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: `Bearer ${access_token}`,
                Authorization: `Bearer ${oauth_token}`
            },
            method: 'PUT',
            body: JSON.stringify({
                movies: data.movie
            })
        });
        if (response.status === 403 || response.status === 401) {
            return response.status;
        }
        const res = await response.json().then((res: ActionPlaylistsResponse) => {
            if (res.success) {
                return res.data;
            } else {
                return null;
            }
        });
        return res;
    },
    set: ({ set }, data) => {
        if (typeof data === 'number') return;
        if (!data) return;
        if (data instanceof DefaultValue) return;
        set(PlaylistsMoviesAtomFamily(data.id), data.movies);
        set(PlaylistSelectedAtom, null);
    }
});

export const RemovePlaylistSelector = selector<{ movies: TVMovie[]; id: string } | null | number>({
    key: 'RemovePlaylistSelector',
    get: async ({ get }) => {
        const oauth_token = get(OAuthAtom);
        const access_token = get(AccessTokenAtom);
        const data = get(PlaylistSelectedAtom);

        if (!oauth_token || !access_token || access_token === 'refresh' || !data || data.state) return null;
        const url = process.env.VITE_API_URL as string;
        let response: Response = await fetch(
            `${process.env.VITE_API_URL}/v1/api/app/playlists/remove/${data.id}/${data.mid}`,
            {
                headers: {
                    jwtToken: `Bearer ${access_token}`,
                    Authorization: `Bearer ${oauth_token}`
                },
                method: 'PUT'
            }
        );
        if (response.status === 403 || response.status === 401) {
            return response.status;
        }
        const res = await response.json().then((res: ActionPlaylistsResponse) => {
            if (res.success) {
                return res.data;
            } else {
                return null;
            }
        });
        return res;
    },
    set: ({ set }, data) => {
        if (typeof data === 'number') return;
        if (!data) return;
        if (data instanceof DefaultValue) return;
        set(PlaylistsMoviesAtomFamily(data.id), data.movies);
        set(PlaylistSelectedAtom, null);
    }
});
