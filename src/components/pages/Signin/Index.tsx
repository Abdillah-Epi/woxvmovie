import React from "react";
import OSignin from "../../organisms/Signin";
import TSignin from "../../templates/Signin";

const Signin: React.FC = () => {
    return (
        <TSignin>
            <OSignin />
        </TSignin>
    );
};

export default Signin;
