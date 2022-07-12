import { useState } from 'react';
import useResetPasswordQueries from './useResetPasswordQueries';

const useSendRequest = (email: string) => {
    const { sendRequest, error } = useResetPasswordQueries();
    const [active, setActive] = useState(false);

    const sendRequestCallback = async () => {
        const res = await sendRequest(email);
        if (res === 202) return setActive(() => true);
    };

    return [active, sendRequestCallback, error] as const;
};

export default useSendRequest;
