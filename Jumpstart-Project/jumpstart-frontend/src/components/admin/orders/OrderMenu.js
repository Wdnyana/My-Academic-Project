import React, { Fragment, useState, useContext } from "react";
import { OrderContext } from "./index";
import UpdateOrderModal from "./UpdateOrderModal";
import SearchFilter from "./SearchFilter";
import { filterOrder } from "./Action";

const OrderMenu = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const [dropdown, setDropdown] = useState(false);
  return (
    <Fragment>
      <div className="col-span-1 d-flex align-items-center">
        <div className="d-flex flex-column my-4 flex-md-row justify-content-md-between align-items-md-center my-0 w-full">
          {/* It's open the add order modal */}
          <div className="position-relative rounded-5 text-light fw-semibold text-uppercase">
            <div
              onClick={(e) => setDropdown(!dropdown)}
              className="d-flex align-items-center justify-content-center cursor-pointer rounded-5 overflow-hidden p-2"
            >
              <svg
                className="me-2 text-light cursor-pointer"
                height="1.5rem"
                width="1.5rem"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              <span className="pe-2">Filter</span>
            </div>
            <div
              className={`${
                dropdown ? "" : "d-none"
              } position-absolute top-0 left-0 mt-12 rounded-5 py-4 px-3 bg-dark overflow-hidden w-full md:w-48 d-flex flex-column z-10`}
            >
              <span
                onClick={(e) =>
                  filterOrder("All", data, dispatch, dropdown, setDropdown)
                }
                className="px-4 py-2 text-center cursor-pointer"
              >
                All
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Not processed",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 text-center cursor-pointer"
              >
                Not processed
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Processing",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 text-center cursor-pointer"
              >
                Processing
              </span>
              <span
                onClick={(e) =>
                  filterOrder("Shipped", data, dispatch, dropdown, setDropdown)
                }
                className="px-4 py-2 text-center cursor-pointer"
              >
                Shipped
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Delivered",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 text-center cursor-pointer"
              >
                Delivered
              </span>
              <span
                onClick={(e) =>
                  filterOrder(
                    "Cancelled",
                    data,
                    dispatch,
                    dropdown,
                    setDropdown
                  )
                }
                className="px-4 py-2 text-center cursor-pointer"
              >
                Cancelled
              </span>
            </div>
          </div>
          <div>
            <SearchFilter />
          </div>
        </div>
        {/*<AddCategoryModal/>*/}
        <UpdateOrderModal />
      </div>
    </Fragment>
  );
};

export default OrderMenu;
