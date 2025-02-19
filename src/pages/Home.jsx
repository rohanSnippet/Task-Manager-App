import React, { useRef } from "react";
import Hero from "./Hero";
import FeaturesSection from "./FeaturesSection";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";

const Home = () => {

  const featuresRef = useRef(null);

  const scrollToFeatures=()=>{
    featuresRef.current.scrollIntoView({behaviour: "smooth"});
  }


  return (
    <div>
      <Hero onLearnMoreClick={scrollToFeatures}/>
      <FeaturesSection ref={featuresRef}/>
      <Stats/>
      <Testimonials/>
      <FAQ/>
    </div>
  );
};
export default Home;
