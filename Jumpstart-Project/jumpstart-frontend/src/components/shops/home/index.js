import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import HeroSection from "./HeroSection";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";

export const HomeContext = createContext();

const HomeComponent = () => {
  return (
    <Fragment>
      <div className="container mt-3rem mb-20">
        {/* hero section */}
        <HeroSection />
        {/* Category, Search & Filter Section */}
        <section className="my-4">
          <ProductCategory />
        </section>
        {/* Product Section */}
        <section className="mt-5">
          <h3 className="text-start text-light fw-semibold">Products</h3>
          <div className="row row-cols-lg-4 row-cols-2 row-cols-md-3 my-4 md:mx-8 md:my-6">
            <SingleProduct />
          </div>
        </section>
        <section>
          <Slider />
        </section>
      </div>
    </Fragment>
  );
};

const Home = (props) => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
