import React, { useEffect, useState } from "react";
import Cover from "../../atoms/Cover";
import Nav from "../../molecules/Nav";
import cover from "../../../assets/images/cover.webp";
import Forms from "../../molecules/Forms";
import { InputAtomFamily } from "../../../store/inputs";
import { isClickedAtomFamily } from "../../../store/button";
import { useRecoilState } from "recoil";
import useResetPasssword from "../../../hooks/useResetPasssword";

const FormsData = {
    title: "Entrez votre adress mail",
    inputs: [
        {
            placeHolder: "E-mail",
            type: "email",
            id: "email-reset"
        }
    ],
    btn: "Envoyer"
};

const OSendRequest: React.FC = () => {
    const [email, setEmail] = useRecoilState(InputAtomFamily("email-reset"));
    const [isClicked, setClick] = useRecoilState(isClickedAtomFamily("Envoyer"));
    const [active, setActive] = useState<boolean>(false);

    const { sendRequest } = useResetPasssword();
    useEffect(() => {
        if (!isClicked) return;
        setClick(() => false);
        sendRequest(email.value).then(res => {
            if (res === 202) {
                setEmail(() => ({ value: "", error: "" }));
                setActive(() => true);
            }
        });
    }, [isClicked]);
    return (
        <section className='relative h-screen w-screen'>
            <div className='absolute inset-0'>
                <Cover img={cover} />
            </div>
            <div className='absolute top-0 h-full w-full p-10'>
                <div className='h-[20%]'>
                    <Nav hideRightSide={true} />
                </div>
                <div className='flex h-[80%] w-full justify-center'>
                    <div className='flex h-[75%] items-center justify-center bg-black/75 px-16 pt-16 xl:w-[30%]'>
                        {!active && <Forms {...FormsData} />}
                        {active && (
                            <svg className='w-32' width='376' height='376' viewBox='0 0 376 376' fill='none'>
                                <path
                                    d='M188 0C84.224 0 0 84.224 0 188C0 291.776 84.224 376 188 376C291.776 376 376 291.776 376 188C376 84.224 291.776 0 188 0ZM150.4 282L56.4 188L82.908 161.492L150.4 228.796L293.092 86.104L319.6 112.8L150.4 282Z'
                                    fill='#F24C27'
                                />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OSendRequest;
