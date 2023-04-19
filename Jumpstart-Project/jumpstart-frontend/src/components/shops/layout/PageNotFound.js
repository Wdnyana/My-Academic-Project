import React from "react";
import Layout from "./index";

import "../../../assets/css/styles.css";

const PageNotFoundComponent = (props) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-32">
      <span>
        <svg
          className="w-50 h-50 text-light mx-auto d-block"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      <span className="text-center text-light text-4xl fw-bold tracking-widest">
        404 not found
      </span>
    </div>
  );
};

const PageNotFound = (props) => {
  return <Layout children={<PageNotFoundComponent />} />;
};

export default PageNotFound;
