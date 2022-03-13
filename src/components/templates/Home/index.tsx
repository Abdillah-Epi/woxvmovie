import React, { Suspense, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useAuth from "../../../hooks/useAuth";
import { CleanAuthSelector } from "../../../store/auth";
import { isClickedAtomFamily } from "../../../store/button";
import {
    AddPlaylistSelector,
    FavoritesSelector,
    PlaylistsIDsSelector,
    RemovePlaylistSelector,
    ViewsSelector
} from "../../../store/movies";
import { UserAtom } from "../../../store/user";
import MoviesLoaderTemplate from "../../molecules/MoviesLoaderTemplate";
import TposLoaderTemplate from "../../molecules/TposLoaderTemplate";
import Category from "../../organisms/Category";
import QuickPlaylist from "../../organisms/QuickPlaylist";
import Sidenav from "../../organisms/Sidenav";
import Top from "../../organisms/Top";
import navlinks from "../../molecules/Nav/links.json";

export const BackgroundFetching = () => {
    const [movies, setMovies] = useRecoilState(ViewsSelector);
    const [favs, setFavorites] = useRecoilState(FavoritesSelector);
    const [playlist, setPlaylist] = useRecoilState(PlaylistsIDsSelector);
    const { setOAuth, setAccessToken } = useAuth();
    const [data, initFamily] = useRecoilState(AddPlaylistSelector);
    const rdata = useRecoilValue(RemovePlaylistSelector);

    useEffect(() => {
        if (rdata === 403) setOAuth(() => null);
        if (rdata === 401) setAccessToken(() => null);
        initFamily(() => rdata);
    }, [rdata]);

    useEffect(() => {
        if (data === 403) setOAuth(() => null);
        if (data === 401) setAccessToken(() => null);
        initFamily(() => data);
    }, [data]);

    useEffect(() => {
        if (movies === 403) setOAuth(() => null);
        if (movies === 401) setAccessToken(() => null);
        setMovies(() => movies);
    }, [movies]);

    useEffect(() => {
        if (favs === 403) setOAuth(() => null);
        if (favs === 401) setAccessToken(() => null);
        setFavorites(() => favs);
    }, [favs]);

    useEffect(() => {
        if (playlist === 403) setOAuth(() => null);
        if (playlist === 401) setAccessToken(() => null);
        setPlaylist(() => playlist);
    }, [playlist]);

    return <div></div>;
};

export const Movies = () => {
    const user = useRecoilValue(UserAtom);
    return !user ? (
        <></>
    ) : (
        <>
            <Suspense fallback={<MoviesLoaderTemplate />}>
                <Category
                    key={1}
                    infos={{ genre: user?.genres[0]!, path: "popular" }}
                    title={`${user?.genres[0]} Movies`}
                />
            </Suspense>
            <Suspense fallback={<MoviesLoaderTemplate />}>
                <Category
                    key={2}
                    infos={{ genre: user?.genres[1]!, path: "popular" }}
                    title={`${user?.genres[1]} Movies`}
                />
            </Suspense>
            <Suspense fallback={<TposLoaderTemplate />}>
                <Top title='Popular Movies' path='trainding' />
            </Suspense>
            <Suspense fallback={<MoviesLoaderTemplate />}>
                <Category
                    key={3}
                    infos={{ genre: user?.genres[2]!, path: "popular" }}
                    title={`${user?.genres[2]} Movies`}
                />
            </Suspense>
            <Suspense fallback={<MoviesLoaderTemplate />}>
                <Category
                    key={4}
                    infos={{ genre: user?.genres[3]!, path: "popular" }}
                    title={`${user?.genres[3]} Movies`}
                />
            </Suspense>
        </>
    );
};

export const TV = () => {
    const user = useRecoilValue(UserAtom);
    return !user ? (
        <></>
    ) : (
        <>
            <Suspense fallback={<MoviesLoaderTemplate />}>
                <Category
                    infos={{ genre: user?.genres[0]!, path: "popular/tv" }}
                    key={5}
                    title={`${user?.genres[0]} TV Shows`}
                />
            </Suspense>
            <Suspense fallback={<MoviesLoaderTemplate />}>
                <Category
                    infos={{ genre: user?.genres[1]!, path: "popular/tv" }}
                    key={6}
                    title={`${user?.genres[1]} TV Shows`}
                />
            </Suspense>
            <Suspense fallback={<TposLoaderTemplate />}>
                <Top path='top/tv' key={10} title='Top Rated TV Shows' />
            </Suspense>
            <Suspense fallback={<MoviesLoaderTemplate />}>
                <Category
                    infos={{ genre: user?.genres[2]!, path: "popular/tv" }}
                    key={7}
                    title={`${user?.genres[2]} TV Shows`}
                />
            </Suspense>
            <Suspense fallback={<MoviesLoaderTemplate />}>
                <Category
                    infos={{ genre: user?.genres[3]!, path: "popular/tv" }}
                    key={8}
                    title={`${user?.genres[3]} TV Shows`}
                />
            </Suspense>
        </>
    );
};

const THome: React.FC = ({ children }) => {
    const logout = useSetRecoilState(CleanAuthSelector);
    const [isClicked, resetClick] = useRecoilState(isClickedAtomFamily("Déconexion"));

    useEffect(() => {
        if (!isClicked) return;
        resetClick(() => false);
        logout("");
    }, [isClicked]);
    return (
        <div className='sticky w-screen bg-black'>
            {children}
            <div className='fixed top-0 w-[80%]'>
                <Sidenav list={[...navlinks, { path: "/", text: "Déconexion" }]} />
            </div>
            <QuickPlaylist />
        </div>
    );
};

export default THome;
