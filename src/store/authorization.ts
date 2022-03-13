import { atom, selector } from 'recoil';

export const OAuthAtom = atom<string | null>({
    key: 'OAuthAtom',
    default: null,
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            setSelf(() => sessionStorage.getItem('oauth_woxvmovie'));
            onSet(newValue => {
                if (!newValue) {
                    sessionStorage.removeItem('oauth_woxvmovie');
                } else {
                    sessionStorage.setItem('oauth_woxvmovie', newValue);
                }
            });
        }
    ]
});

export const getOAuthSelector = selector({
    key: 'getOAuthSelector',
    get: async ({ get }) => {
        const oauth = get(OAuthAtom);

        if (oauth) return null;
        const formData = new FormData();

        const clientID = process.env.VITE_CLIENT_ID as string;
        const clientSecret = process.env.VITE_CLIENT_SECRET as string;
        const url = process.env.VITE_API_URL as string;

        formData.append('grant_type', 'client_credentials');
        formData.append('client_id', clientID);
        formData.append('client_secret', clientSecret);

        const response = await fetch(`${url}/authorization`, {
            method: 'POST',
            body: formData
        });

        const body = await response.json();
        return body.access_token as string;
    },
    set: ({ set }) => {
        set(OAuthAtom, null);
    }
});
