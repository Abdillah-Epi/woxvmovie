import { useEffect, useState } from "react";

const useDebounced = (q: string) => {
    const [qDebounce, setQdebounced] = useState(q);

    useEffect(() => {
        let id = setTimeout(() => {
            setQdebounced(() => q);
        }, 1000);

        return () => clearTimeout(id);
    }, [q]);

    return { qDebounce, setQdebounced };
};

export default useDebounced;
