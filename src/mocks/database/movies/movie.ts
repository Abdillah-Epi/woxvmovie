export type Results = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
};

export type Video = {
    id: number;
    results: Results;
};

export type MovieBanner = {
    success: boolean;
    video: Video;
};

export const Movie: MovieBanner = {
    success: true,
    video: {
        id: 698128,
        results: {
            iso_639_1: 'en',
            iso_3166_1: 'US',
            name: 'Official Trailer',
            key: 'uPzyA1gMNsM',
            site: 'YouTube',
            size: 1080,
            type: 'Trailer',
            official: true,
            published_at: '2022-03-30T16:03:22Z',
            id: '6246534c5c5cc8004e4e5fd0'
        }
    }
};
