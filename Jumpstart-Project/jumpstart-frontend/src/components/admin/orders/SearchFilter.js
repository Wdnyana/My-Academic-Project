import React, { Fragment } from "react";

const SearchFilter = (props) => {
  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between overflow-hidden my-4">
        <span className="py-2 px-3 border">
          <svg
            className="cursor-pointer text-light"
            height="1.5rem"
            width="1.5rem"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input
          placeholder="Transaction id..."
          className="py-2 px-2 focus:outline-none rounded-r-full w-full bg-transparent text-light border"
          type="text"
        />
      </div>
    </Fragment>
  );
};

export default SearchFilter;
