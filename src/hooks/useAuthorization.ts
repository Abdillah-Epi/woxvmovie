import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getOAuthSelector, OAuthAtom } from '../store/authorization';

const useAuthorization = () => {
    const token = useRecoilValue(getOAuthSelector);
    const setOAuth = useSetRecoilState(OAuthAtom);

    useEffect(() => {
        if (!token) return;
        setOAuth(() => token);
    }, [token]);

    return { setOAuth, token };
};

export default useAuthorization;
