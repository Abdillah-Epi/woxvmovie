import React from "react";

type TResetPasswordProps = {};

const TResetPassword: React.FC<TResetPasswordProps> = ({ children }) => {
    return <div className='flex flex-col overflow-y-scroll bg-black'>{children}</div>;
};

export default TResetPassword;
