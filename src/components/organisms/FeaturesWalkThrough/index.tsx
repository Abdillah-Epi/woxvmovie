import React from "react";
import Feature from "../../molecules/Feature";
import tv from "../../../assets/videos/Tv.mp4";
import loading from "../../../assets/videos/Loading.mp4";
import phone from "../../../assets/images/phone.webp";
import { motion } from "framer-motion";
type FeaturesWalkThroughProps = {};

const FeaturesWalkThrough: React.FC<FeaturesWalkThroughProps> = () => {
    return (
        <motion.section>
            <Feature
                key={1}
                title='Regardez Woxvmoie sur votre TV.'
                text='Regardez Woxvmoie sur votre Smart TV, PlayStation, Xbox, Chromecast, Apple TV, lecteurs Blu-ray et bien plus.'
                video={tv}
                styles={"bg-woxvmoie-5"}
            />
            <Feature
                key={2}
                title='Téléchargez vos séries préférées pour les regarder hors connexion.'
                text='Enregistrez vos programmes préférés et ayez toujours quelque chose à regarder.'
                video={loading}
                videoPos={"left"}
            />
            <Feature
                key={3}
                title='Où que vous soyez.'
                text='Regardez des films et séries TV en accès illimité sur votre TV, smartphone, tablette et ordinateur, tout compris.'
                img={phone}
            />
        </motion.section>
    );
};

export default FeaturesWalkThrough;
