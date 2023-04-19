import React, { Fragment, useContext } from "react";
import ProductCategoryDropdown from "./ProductCategoryDropdown";
import { HomeContext } from "./index";
import Search from "./Search";

const ProductCategory = (props) => {
  const { data, dispatch } = useContext(HomeContext);

  return (
    <Fragment>
      <div className="my-5 text-center text-light">
        <div
          onClick={(e) =>
            dispatch({
              type: "searchDropdown",
              payload: !data.searchDropdown,
            })
          }
          className={`d-flex align-items-center justify-content-center ${
            data.searchDropdown ? "text-light" : ""
          }`}
        >
          <h2 className="fw-normal me-2">Search Product</h2>
          <span>
            <svg
              className="d-flex align-items-center"
              height="2rem"
              width="2rem"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
        </div>
        <Search />
      </div>

      <div className="d-flex justify-content-between fw-semibold">
        <div
          onClick={(e) =>
            dispatch({
              type: "categoryListDropdown",
              payload: !data.categoryListDropdown,
            })
          }
          className={`d-flex align-items-center mx-1 cursor-pointer ${
            data.categoryListDropdown ? "text-warning" : ""
          }`}
        >
          <span className="me-2">Categories</span>
          <svg
            className="text-warning"
            height="1rem"
            width="1rem"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

        <div
          onClick={(e) =>
            dispatch({
              type: "filterListDropdown",
              payload: !data.filterListDropdown,
            })
          }
          className={`d-flex align-items-center cursor-pointer ${
            data.filterListDropdown ? "text-yellow-700" : ""
          }`}
        >
          <span className="me-2">Filter</span>
          <span>
            <svg
              className="text-light"
              height="1rem"
              width="1rem"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <ProductCategoryDropdown />
    </Fragment>
  );
};

export default ProductCategory;
