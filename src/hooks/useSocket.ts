import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IsMovieLikedSelector } from '../store/linkes';
import { SocketAtom } from '../store/socket';

const useSocket = () => {
    const [socket, setSocket] = useRecoilState(SocketAtom);
    const toggleLikeStatus = useSetRecoilState(IsMovieLikedSelector);

    useEffect(() => {
        if (!socket) {
            setSocket(() => new WebSocket('ws://localhost:9000/ws'));
        } else {
            socket.onmessage = (ev: MessageEvent<string>) => {
                const data: { status: boolean; id: number } = JSON.parse(ev.data);

                if (!data.status) return;
                toggleLikeStatus(() => data);
            };
        }
    }, [socket]);
};

export default useSocket;
