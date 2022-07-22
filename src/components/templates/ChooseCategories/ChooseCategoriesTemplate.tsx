import React from 'react';

type ChooseCategoriesTemplateProps = React.HTMLAttributes<HTMLDivElement>;

const ChooseCategoriesTemplate: React.FC<ChooseCategoriesTemplateProps> = ({ children }) => {
    return <div className='w-screen space-y-52 bg-[#141414] xl:h-screen'>{children}</div>;
};

export default ChooseCategoriesTemplate;
