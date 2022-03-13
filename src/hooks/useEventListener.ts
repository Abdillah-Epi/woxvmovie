import { useEffect, useRef } from "react";

const useEventListener = (
    eventName: string,
    handler: any,
    element: (Window & typeof globalThis) | any = window,
    status = false
) => {
    const savedHandler = useRef<any>();

    useEffect(() => {
        savedHandler.current = handler;
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!element) return;

        const eventListener = (event: any) => savedHandler.current(event);

        if (status) {
            element.current.addEventListener(eventName, eventListener);
        } else {
            element.addEventListener(eventName, eventListener);
        }

        return () => {
            if (status && element.current) {
                element.current.removeEventListener(eventName, eventListener);
            } else if (!status && element) {
                element.removeEventListener(eventName, eventListener);
            }
        };
    }, [eventName, element]);
};

export default useEventListener;
