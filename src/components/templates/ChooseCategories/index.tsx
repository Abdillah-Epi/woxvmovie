import React from "react";

export type TChooseCategoriesProps = {};
const TChooseCategories: React.FC = ({ children }) => {
    return <div className='w-screen space-y-52 bg-black xl:h-screen'>{children}</div>;
};

export default TChooseCategories;
