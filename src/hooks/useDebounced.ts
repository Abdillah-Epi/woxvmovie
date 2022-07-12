import { useEffect, useState } from 'react';

const useDebounced = () => {
    const [q, setQ] = useState('');

    useEffect(() => {
        let id = setTimeout(() => {
            setQ(() => q);
        }, 1000);

        return () => clearTimeout(id);
    }, [q]);

    return [q, setQ] as const;
};

export default useDebounced;
