import React, { Fragment, useContext, useState, useEffect } from "react";
import { OrderContext } from "./index";
import { getAllOrder, editCategory } from "./FetchApi";

const UpdateOrderModal = (props) => {
  const { data, dispatch } = useContext(OrderContext);

  const [status, setStatus] = useState("");

  const [oId, setOid] = useState("");

  useEffect(() => {
    setOid(data.updateOrderModal.oId);
    setStatus(data.updateOrderModal.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.updateOrderModal.modal]);

  const fetchData = async () => {
    let responseData = await getAllOrder();
    if (responseData.Orders) {
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: responseData.Orders,
      });
    }
  };

  const submitForm = async () => {
    dispatch({ type: "loading", payload: true });
    let responseData = await editCategory(oId, status);
    if (responseData.error) {
      dispatch({ type: "loading", payload: false });
    } else if (responseData.success) {
      console.log(responseData.success);
      dispatch({ type: "updateOrderModalClose" });
      fetchData();
      dispatch({ type: "loading", payload: false });
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "updateOrderModalClose" })}
        className={`${
          data.updateOrderModal.modal ? "" : "d-none"
        } position-fixed top-0 left-0 z-30 w-full h-full bg-dark opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.updateOrderModal.modal ? "" : "d-none"
        } position-fixed inset-0 m-4 d-flex align-items-center z-30 justify-content-center`}
      >
        <div className="ms-start-5 rounded-5 position-relative bg-secondary w-11/12 md:w-3/6 shadow-lg d-flex flex-column align-items-center my-4 overflow-y-auto px-4 py-4 px-md-5">
          <div className="d-flex align-items-center justify-content-between w-full pt-4">
            <span className="text-start fw-semibold text-2xl tracking-wider">
              Update Order
            </span>
            {/* Close Modal */}
            <span
              onClick={(e) => dispatch({ type: "updateOrderModalClose" })}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="text-light cursor-pointer"
                height="1.5rem"
                width="1.5rem"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          <div className="d-flex flex-column my-4 w-full">
            <label htmlFor="status" className="mb-2 mt-3">
              Order Status
            </label>
            <select
              value={status}
              name="status"
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 border focus:outline-none  rounded-4 bg-secondary text-light"
              id="status"
            >
              <option name="status" value="Not processed">
                Not processed
              </option>
              <option name="status" value="Processing">
                Processing
              </option>
              <option name="status" value="Shipped">
                Shipped
              </option>
              <option name="status" value="Delivered">
                Delivered
              </option>
              <option name="status" value="Cancelled">
                Cancelled
              </option>
            </select>
          </div>
          <div className="d-flex flex-column my-1 w-50 pb-4 pb-md-5">
            <button
              onClick={(e) => submitForm()}
              className="rounded-5 bg-primary border-0 text-light fw-normal py-2"
            >
              Update category
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateOrderModal;
