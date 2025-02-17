import React from "react";
import Banner from "../webComponents//Home/Banner/Banner";
import PlatformSlider from "../webComponents/Home/PlatformSlider/PlatformSlider";
import CategoriesSection from "../webComponents//Home/CategoriesSection/CategoriesSection";
import PropertySection from "../webComponents//Home/PropertySection/PropertySection";
import PropertyList from "../webComponents//Home/PropertyList/PropertyList";
import ConsultancySection from "../webComponents/Home/ConsultancySection/ConsultancySection";
import LifeStyleSection from "../webComponents/Home/LifeStyleSection/LifeStyleSection";
import AboutUs from "../webComponents/Home/AboutUs/AboutUs";
import CommunitySection from "../webComponents/Home/CommunitySection/CommunitySection";
import TopProjectSection from "../webComponents/Home/TopProjectSection/TopProjectSection";
import ContactSection from "../webComponents/Home/ContactSection/ContactSection";
import PopularAreas from "../webComponents/Home/PopularAreas/PopularAreas";
import AwardsSlider from "../webComponents/Home/AwardsSlider/AwardsSlider";
import WhyChooseUs from "../webComponents/Home/WhyChooseUs/WhyChooseUs";
import AgentSlider from "../webComponents/Home/AgentSlider/AgentSlider";
import ExploreDeveloperSection from "../webComponents/Home/ExploreDeveloperSection/ExploreDeveloperSection";

function Home() {
  return (
    <div className=" bg-white">
      <Banner />
      <PlatformSlider />
      <CategoriesSection />
      <PropertySection />
      <PropertyList />
      <ConsultancySection />
      <LifeStyleSection />
      <AboutUs />
      <CommunitySection />
      <TopProjectSection />
      <ContactSection />
      <PopularAreas />
      <AwardsSlider />
      <WhyChooseUs />
      <AgentSlider />
      <ExploreDeveloperSection />
    </div>
  );
}

export default Home;
