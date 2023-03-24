import React from 'react';
import UseTitle from '../../../Hooks/UseTitle';
import About from '../About/About';
import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import Feedback from '../Feedback/Feedback';
import Map from '../Map/Map';
import Services from '../Services/Services';

const Home = () => {
  UseTitle("Home")
    return (
        <div>
          <Banner></Banner>
          <About></About>
          <Services></Services>
          <Features></Features>
          <Feedback></Feedback>
          <Map></Map>
        </div>
    );
};

export default Home;