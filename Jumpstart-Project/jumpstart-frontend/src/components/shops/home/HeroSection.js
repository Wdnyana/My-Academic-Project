import React, { Fragment } from "react";
import { HeroImg } from "../../../assets/img";

const HeroSection = () => {
  return (
    <Fragment>
      <div className="hero__banner p-5 bg-secondary rounded-5 shadow">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-7 mb-4 mb-md-0 ">
            <p className="fw text-light mb-1">Find your Style here..</p>
            <h1 className="fw-bold text-light mb-4">Welcome to Jumpstart</h1>
            <p className="text-light">
              Upgrade your wardrobe with our stylish and comfortable t-shirts!
              Shop now and discover a range of unique designs that'll make you
              stand out from the crowd. From classic to quirky, we've got
              something for everyone.
            </p>
          </div>
          <div className="col-12 col-md-5">
            <div className="h__image w-100">
              <img
                src={HeroImg}
                className="img-fluid w-100 img__hero rounded-4"
                alt="image_hero_section"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HeroSection;
