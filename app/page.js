import React from "react";
import Carousel from "@/componets/Home/Slider/Carousel";
import OurCoreValue from "@/componets/Home/OurCoreValue/OurCoreValue";
import Review from "@/componets/Home/Review/Review";
import ProductCard from "@/componets/Home/ProductCard";

const Home = () => {
  return (
    <>
      <div className="w-full min-h-screen">
        <Carousel />
        <OurCoreValue />
        <ProductCard />
        <Review />
      </div>
    </>
  );
};

export default Home;
