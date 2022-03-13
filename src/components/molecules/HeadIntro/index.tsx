import React from "react";
import Body from "../../atoms/Typography/Body";
import Header from "../../atoms/Typography/Header";
import SubHeader from "../../atoms/Typography/SubHeader";

type HeadIntroProps = {};

const HeadIntro: React.FC<HeadIntroProps> = () => {
    return (
        <div className='flex w-full flex-col items-center justify-center space-y-6 text-center'>
            <div className='lg:w-[55%]'>
                <Header text={"Films, séries TV et bien plus en illimité."} color={"text-white"} />
            </div>
            <SubHeader text={"Où que vous soyez. Annulez à tout moment."} color={"text-white"} />
            <div className='sm:w-[50%]'>
                <Body
                    text={
                        "Prêt à regarder Woxvmoie ? Sassissez votre adress e-mail pour vous abonner ou réactiver votre abonnement."
                    }
                    color={"text-white"}
                />
            </div>
        </div>
    );
};

export default HeadIntro;
