import React from "react";
import Navbar from "../../Layouts/Navbar";
import HeroSection from "../Home/HeroSection";
import Amenities from "./Amenities";
import FeatureCards from "./FeatureCards";
import Footer from "../../Layouts/Footer";
import WhyChooseUs from "./WhyChooseUs";

function index() {
    return (
        <div className="w-full min-h-screen bg-[#e8e9f0] overflow-x-hidden text-[#1a1f2c]">
            <div className="relative w-full min-h-screen">
                <Navbar />
                <HeroSection />
            </div>
            <main id="main-content" className="w-full overflow-x-hidden">
                <WhyChooseUs />
                <Amenities />
                <FeatureCards />
            </main>
            <Footer />
        </div>
    );
}

export default index;

