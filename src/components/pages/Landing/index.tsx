import React from "react";
import LandingPage from "../../templates/LandingPage";
import Hero from "../../organisms/Hero";
import FeaturesWalkThrough from "../../organisms/FeaturesWalkThrough";
import FAQ from "../../organisms/FAQ";
import Footer from "../../organisms/Footer";

const Landing: React.FC = () => {
    return (
        <LandingPage>
            <Hero />
            <FeaturesWalkThrough />
            <FAQ />
            <Footer />
        </LandingPage>
    );
};

export default Landing;
