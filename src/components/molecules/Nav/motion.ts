export const variantHeader = {
    hidden: {
        opacity: 0,
        y: -100
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1
        }
    },
    exit: {
        y: -100,
        opacity: 0,
        transition: {
            duration: 0.5
        }
    }
};

export const variantBtn = {
    hidden: {
        opacity: 0,
        x: 100
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1
        }
    },
    exit: {
        x: 100,
        opacity: 0,
        transition: {
            duration: 0.5
        }
    }
};

export const variantLinks = {
    hidden: {
        opacity: 0
    },
    show: (i: number) => {
        return {
            opacity: 1,
            transition: {
                delay: 0.1 * i,
                duration: 1
            }
        };
    },
    exit: {
        y: -100,
        opacity: 0,
        transition: {
            duration: 0.5
        }
    }
};
