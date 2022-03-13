import React from "react";
import OSendRequest from "../../organisms/SendRequest";
import TSendRequest from "../../templates/SendRequest";

const SendRequest: React.FC = () => {
    return (
        <TSendRequest>
            <OSendRequest />
        </TSendRequest>
    );
};

export default SendRequest;
