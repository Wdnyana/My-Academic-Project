import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const Submenu = (props) => {
  const { categoryId, category, product } = props.value;
  const history = useHistory();
  return (
    <Fragment>
      {/* Submenu Section */}
      <section className="mt-24 md:mx-12 md:mt-32 lg:mt-24">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex mx-2">
              <span
                className="text-light cursor-pointer"
                onClick={(e) => history.push("/")}
              >
                Shop {"> "} &ensp;
              </span>
              <span
                className="text-light cursor-pointer"
                onClick={(e) =>
                  history.push(`/products/category/${categoryId}`)
                }
              >
                {category} {"> "} &ensp;
              </span>
              <span className="cursor-default">{product}</span>
            </div>
            <div>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
      {/* Submenu Section */}
    </Fragment>
  );
};

export default Submenu;
