import { Suspense } from 'react';
import { MakeGenerics, ReactLocation, Route } from '@tanstack/react-location';

import HomeTemplate from '../components/templates/Home';
import DisplayPlaylistsTemplate from '../components/templates/DisplayPlaylists';
import DisplayMovieSeriesTemplate from '../components/templates/DisplayMovieSeries';

import Home from '../components/pages/Home';
import Views from '../components/pages/Views';
import Errors from '../components/pages/Errors';
import OAuth2 from '../components/pages/OAuth2';
import Search from '../components/pages/Search';
import Signin from '../components/pages/Signin';
import Signup from '../components/pages/Signup';
import Details from '../components/pages/Details';
import Playlist from '../components/pages/Playlist';
import Favorites from '../components/pages/Favorites';
import SendRequest from '../components/pages/SendRequest';
import PlaylistView from '../components/pages/PlaylistView';
import ResetPassword from '../components/pages/ResetPassword';
import ChooseCategories from '../components/pages/ChooseCategories';

export type LocationGenerics = MakeGenerics<{
    Params: {
        token: string;
        code: string;
        id: string;
    };
    Search: {
        q: string;
    };
}>;

export const location = new ReactLocation<LocationGenerics>();

export const routes: Route<LocationGenerics>[] = [
    { path: 'signin', element: <Signin />, id: 'signin' },
    { path: 'signup', element: <Signup /> },
    { path: 'password_update', children: [{ path: ':token', element: <ResetPassword /> }] },
    { path: 'reset-password', element: <SendRequest /> },
    { path: 'signup/oauth2/:token', element: <OAuth2 /> },
    { path: 'signin/oauth2/:token', element: <OAuth2 /> },
    { path: 'error', children: [{ path: ':code', element: <Errors /> }] },
    {
        path: 'app',
        children: [
            {
                path: '/',
                element: (
                    <HomeTemplate>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Home />
                        </Suspense>
                    </HomeTemplate>
                )
            },
            { path: 'genres', element: <ChooseCategories /> },
            {
                path: 'details',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Details />
                    </Suspense>
                )
            },
            {
                path: 'views',
                element: (
                    <DisplayMovieSeriesTemplate>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Views />
                        </Suspense>
                    </DisplayMovieSeriesTemplate>
                )
            },
            {
                path: 'favorites',
                element: (
                    <DisplayMovieSeriesTemplate>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Favorites />
                        </Suspense>
                    </DisplayMovieSeriesTemplate>
                )
            },
            {
                path: 'playlist',
                children: [
                    {
                        path: '/',
                        element: (
                            <DisplayPlaylistsTemplate>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Playlist />
                                </Suspense>
                            </DisplayPlaylistsTemplate>
                        )
                    },
                    {
                        path: 'view/:id',
                        element: (
                            <DisplayMovieSeriesTemplate>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <PlaylistView />
                                </Suspense>
                            </DisplayMovieSeriesTemplate>
                        )
                    }
                ]
            },
            {
                path: 'search',
                element: (
                    <DisplayMovieSeriesTemplate>
                        <Search />
                    </DisplayMovieSeriesTemplate>
                )
            }
        ]
    },
    { path: '/', element: <Signin />, id: 'signin' }
];
