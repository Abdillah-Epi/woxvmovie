import React from "react";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import SubHeader from "../../atoms/Typography/SubHeader";

type FormsProps = {
    title: string;
    inputs:
        | {
              placeHolder: string;
              type: string;
              id: string;
          }[]
        | null;
    btn: string;
};

const Forms: React.FC<FormsProps> = ({ title, inputs = null, btn }) => {
    return (
        <div className='w-full'>
            <div className='mb-20 flex justify-center'>
                <SubHeader text={title} styles={"text-center"} color={"text-white"} />
            </div>
            <div className='mb-14 space-y-4'>
                {inputs?.map((input, key) => {
                    return (
                        <div key={key} className='h-16'>
                            <Input
                                styles='rounded'
                                placeHolder={input.placeHolder}
                                id={input.id}
                                type={input.type}
                                key={key}
                            />
                        </div>
                    );
                })}
            </div>
            <Button textStyles={{ textPos: "center", textColor: "text-white" }} text={btn} styles='rounded-sm' />
        </div>
    );
};

export default Forms;
