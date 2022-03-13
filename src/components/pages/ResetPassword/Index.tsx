import React from "react";
import OResetPassword from "../../organisms/ResetPassword";
import TResetPassword from "../../templates/ResetPassword";

const ResetPassword: React.FC = () => {
    return (
        <TResetPassword>
            <OResetPassword />
        </TResetPassword>
    );
};

export default ResetPassword;
