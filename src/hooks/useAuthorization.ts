import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getOAuthSelector, OAuthAtom } from "../store/authorization";

const useAuthorization = () => {
    const setOAuth = useSetRecoilState(OAuthAtom);
    const token = useRecoilValue(getOAuthSelector);

    useEffect(() => {
        if (!token) return;
        setOAuth(() => token);
    }, [token]);

    return { setOAuth };
};

export default useAuthorization;
