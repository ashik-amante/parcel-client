import React from 'react';
import Banner from '../Banner/Banner';
import Service from '../Service section/Service';
import Client from '../Our Client/Client';
import FeaturesSection from '../Features section/FeaturesSection';
import BeMarchent from '../Be a marchent/BeMarchent';
import ReviewSection from '../Review/ReviewSection';
import HowItWorks from '../How it work/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Service></Service>
            <Client></Client>
            <FeaturesSection></FeaturesSection>
            <BeMarchent></BeMarchent>
            <ReviewSection></ReviewSection>
            
        </div>
    );
};

export default Home;