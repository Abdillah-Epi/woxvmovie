import React from 'react';
import TErrors from '../../templates/Errors';
import OErrors from '../../organisms/Errors';

const Errors: React.FC = () => {
    return (
        <TErrors>
            <OErrors />
        </TErrors>
    );
};

export default Errors;
