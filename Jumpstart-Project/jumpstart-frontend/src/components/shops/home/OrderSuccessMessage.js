import React, { Fragment, useContext } from "react";
import { LayoutContext } from "../layout";

const OrderSuccessMessage = (props) => {
  const { data, dispatch } = useContext(LayoutContext);
  return (
    <Fragment>
      <div
        className={`${
          data.orderSuccess ? "" : "d-none"
        } position-fixed container bottom-0 d-flex justify-content-between align-items-center z-30 w-full bg-secondary text-white py-4 px-5 text-center`}
      >
        <span className="w-10/12 md:w-full">
          Your Order in process. Wait 2 days to deliver.
        </span>
        <span
          onClick={(e) => dispatch({ type: "orderSuccess", payload: false })}
          className="p-2 rounded-5 cursor-pointer"
        >
          <svg
            className="cursor-pointer text-light"
            height="2rem"
            width="2rem"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </Fragment>
  );
};

export default OrderSuccessMessage;
