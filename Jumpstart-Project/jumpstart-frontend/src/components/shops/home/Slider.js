import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    sliderImages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="position-relative mt-24 border-2">
        {data.sliderImages.length > 0 ? (
          <img
            className="w-full h-full h-100"
            src={`${apiURL}/uploads/carousels/${data.sliderImages[slide].slideImage}`}
            alt="sliderImage"
          />
        ) : (
          ""
        )}

        {data?.sliderImages?.length > 0 ? (
          <>
            <svg
              onClick={(e) =>
                prevSlide(data.sliderImages.length, slide, setSlide)
              }
              className={`z-10 p-2 rounded-5 position-absolute mt-3 left-0 d-flex justify-content-end align-items-center box-border d-flex justify-content-center border text-light  cursor-pointer`}
              fill="none"
              width="2.5rem"
              height="2.5rem"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div className="border">
              <svg
                onClick={(e) =>
                  nextSlide(data.sliderImages.length, slide, setSlide)
                }
                className={`z-10 border p-2 rounded-5 position-absolute mt-3 right-0 d-flex justify-content-start align-items-center box-border d-flex justify-content-center text-light cursor-pointer`}
                fill="none"
                width="2.5rem"
                height="2.5rem"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <div className="position-relative mt-3 d-flex align-items-end justify-content-center">
              <a
                href="#shop"
                className="cursor-pointer box-border bg-primary fw-semibold rounded-4 text-decoration-none text-white px-5 py-2 rounded"
              >
                Shop Now !!
              </a>
            </div>
          </>
        ) : null}
      </div>

      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
