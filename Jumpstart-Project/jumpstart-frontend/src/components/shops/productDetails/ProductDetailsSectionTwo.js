import React, { Fragment, useContext, useEffect, useState } from "react";
import AllReviews from "./AllReviews";
import ReviewForm from "./ReviewForm";

import { ProductDetailsContext } from "./";
import { LayoutContext } from "../layout";

import { isAuthenticate } from "../auth/fetchApi";

import "../../../assets/scss/styles.scss";

const Menu = () => {
  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData } = useContext(LayoutContext);

  return (
    <Fragment>
      <div className="mt-24 bg-secondary py-3 d-flex flex-column flex-md-row align-items-center justify-content-center fw-semibold">
        <div
          onClick={(e) => dispatch({ type: "menu", payload: true })}
          className={`${
            data.menu ? "border-b-2 border-light text-center" : ""
          } px-5 py-3 rounded-4 cursor-pointer bg-primary me-3 text-center`}
        >
          Description
        </div>
        <div
          onClick={(e) => dispatch({ type: "menu", payload: false })}
          className={`${
            !data.menu ? "border-b-2 border-light" : ""
          } px-5 rounded-4 py-3 position-relative cursor-pointer bg-primary ms-3`}
        >
          <span>Reviews</span>
          <span className=" mt-2 text-white rounded px-1">
            &ensp;{layoutData.singleProductDetail.pRatingsReviews.length}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

const RatingReview = () => {
  return (
    <Fragment>
      <AllReviews />
      {isAuthenticate() ? (
        <ReviewForm />
      ) : (
        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 bg-red-200 px-4 py-2 rounded mb-4">
          You need to login in for review
        </div>
      )}
    </Fragment>
  );
};

const ProductDetailsSectionTwo = (props) => {
  const { data } = useContext(ProductDetailsContext);
  const { data: layoutData } = useContext(LayoutContext);
  const [singleProduct, setSingleproduct] = useState({});

  useEffect(() => {
    setSingleproduct(
      layoutData.singleProductDetail ? layoutData.singleProductDetail : ""
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <section className="m-4 md:mx-12 md:my-8">
        <div className="container">
          <Menu />
          {data.menu ? (
            <div className="mt-6 text-center">{singleProduct.pDescription}</div>
          ) : (
            <RatingReview />
          )}
        </div>
      </section>
      <div className="container">
        <div className="fw-semibold rounded-4 my-4 d-flex justify-content-center text-capitalize font-light tracking-widest bg-secondary p-4">
          <span>Category : &ensp;</span>
          <span className="text-light text-center">
            {" "}
            {singleProduct.pCategory ? singleProduct.pCategory.cName : ""}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetailsSectionTwo;
