import { ErrorResponse } from '../error';

export type Video = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: Date;
    id: string;
};

export type Videos = {
    id: number;
    results: Video;
};

export type TVMovieCached = {
    movie: {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    };
    on: string;
};

export type TVMovie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    on?: string;
};

export type VideosResponse = { video: Videos; success: true } | ErrorResponse;
export type TVMovieResponse = { movies: TVMovie[] | null; success: true } | ErrorResponse;
export type ViewsResponse = { movies: TVMovieCached[]; success: true } | ErrorResponse;
export type PlaylistMoviesResponse = { movies: TVMovieCached[]; success: true } | ErrorResponse;
export type IsMovieLikedResponse = { liked: boolean; success: true } | ErrorResponse;
export type FavoritesResponse = { movies: TVMovieCached[] | null; success: true } | ErrorResponse;
export type PlaylistsName = { id: string; name: string };
export type PlaylistsResponse = { success: true; playlists: { id: string; name: string }[] } | ErrorResponse;

export type Success = { success: true };
