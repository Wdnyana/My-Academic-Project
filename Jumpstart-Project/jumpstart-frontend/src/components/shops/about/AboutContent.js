import React, { Fragment } from "react";

import { AboutImg_1, AboutImg_2 } from "../../../assets/img";

const AboutContent = () => {
  return (
    <Fragment>
      <div className="container mt-3rem mb-20">
        <h1 className="title__about text-light text-center py-3">About Page</h1>
        <div className="mt-5 row d-flex align-items-center">
          <div className="col-12 col-md-7">
            <p className="text__about ">
              At Jumpstart, we believe in the power of omnichannel marketing to
              connect with customers and build lasting relationships. Our team
              of experienced professionals has conducted extensive research into
              the latest trends and strategies for reaching customers through
              multiple channels, including social media, email marketing, and
              in-person events. We understand that today's customers expect
              seamless and personalized experiences, whether they're browsing
              our website or visiting us in-store. That's why we're committed to
              providing exceptional service and high-quality products at every
              touchpoint.
            </p>
          </div>

          <div className="col-12 col-md-5">
            <div className="w-75 d-block mx-auto">
              <img
                src={AboutImg_1}
                className="img-fluid img__about w-100"
                alt="image_about"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 row d-flex align-items-center">
          <div className="col-12 col-md-5">
            <div className="w-75 d-block mx-auto">
              <img
                src={AboutImg_2}
                className="img-fluid img__about w-100"
                alt="image_about"
              />
            </div>
          </div>

          <div className="col-12 col-md-7">
            <p className="text__about ">
              Our passion for customer satisfaction extends to our selection of
              t-shirts, which are carefully curated to meet the needs and
              preferences of a diverse range of shoppers. From classic designs
              to trendy graphics, we offer something for everyone, and we're
              always adding new styles to our collection. At Jumpstart, we're
              more than just a t-shirt shop - we're a team of dedicated
              professionals who are committed to using the latest technology and
              marketing strategies to connect with our customers and deliver an
              exceptional shopping experience. We're proud to be at the
              forefront of omnichannel marketing, and we look forward to helping
              you find your perfect t-shirt.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutContent;
