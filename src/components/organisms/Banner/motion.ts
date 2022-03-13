export const variantsBanner = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            delay: 1,
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        y: -200,
        transition: {
            duration: 0.5
        }
    }
};

export const variantsNav = {
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
    }
};
