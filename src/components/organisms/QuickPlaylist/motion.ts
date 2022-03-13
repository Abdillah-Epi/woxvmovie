export const variantPlaylist = {
    hidden: {
        x: -200,
        opacity: 0
    },
    show: (i: number) => {
        return {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.07 * i,
                duration: 1
            }
        };
    },
    exit: (i: number) => {
        return {
            opacity: 0,
            x: 200,
            transition: {
                delay: 0.07 * i,
                duration: 0.5
            }
        };
    }
};
