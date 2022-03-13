export const variantFeatures = {
    hidden: ({ i, pos }: { i: number; pos: "left" | "right" }) => {
        return {
            opacity: 0,
            x: pos === "left" ? -200 : 200
        };
    },
    show: ({ i, pos }: { i: number; pos: "left" | "right" }) => {
        return {
            opacity: 1,
            x: 0,
            transition: {
                delay: i,
                duration: 1
            }
        };
    },
    exit: ({ i, pos }: { i: number; pos: "left" | "right" }) => {
        return {
            opacity: 0,
            x: pos === "left" ? -200 : 200,
            transition: {
                delay: i,
                duration: 0.5
            }
        };
    }
};
