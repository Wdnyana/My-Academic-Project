import React, { Fragment, useContext, useState, useEffect } from "react";
import { CategoryContext } from "./index";
import { editCategory, getAllCategory } from "./FetchApi";

const EditCategoryModal = (props) => {
  const { data, dispatch } = useContext(CategoryContext);

  const [des, setDes] = useState("");
  const [status, setStatus] = useState("");
  const [cId, setCid] = useState("");

  useEffect(() => {
    setDes(data.editCategoryModal.des);
    setStatus(data.editCategoryModal.status);
    setCid(data.editCategoryModal.cId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.editCategoryModal.modal]);

  const fetchData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      dispatch({
        type: "fetchCategoryAndChangeState",
        payload: responseData.Categories,
      });
    }
  };

  const submitForm = async () => {
    dispatch({ type: "loading", payload: true });
    let edit = await editCategory(cId, des, status);
    if (edit.error) {
      console.log(edit.error);
      dispatch({ type: "loading", payload: false });
    } else if (edit.success) {
      console.log(edit.success);
      dispatch({ type: "editCategoryModalClose" });
      setTimeout(() => {
        fetchData();
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "editCategoryModalClose" })}
        className={`${
          data.editCategoryModal.modal ? "" : "d-none"
        } position-fixed top-0 left-0 z-30 w-full h-full bg-dark opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.editCategoryModal.modal ? "" : "d-none"
        } position-fixed inset-0 m-4 d-flex align-items-center z-30 justify-content-center`}
      >
        <div className="ms-start-5 position-relative bg-dark w-11/12 md:w-3/6 shadow-lg d-flex flex-column align-items-center my-4 overflow-y-auto px-4 py-4 px-md-5">
          <div className="d-flex align-items-center justify-content-between w-full pt-4">
            <span className="text-start fw-semibold text-2xl tracking-wider">
              Add Category
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#8363f0 !important" }}
              onClick={(e) => dispatch({ type: "editCategoryModalClose" })}
              className="cursor-pointer text-light py-2 px-2 rounded-5"
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
          <div className="d-flex flex-column my-1 w-full">
            <label htmlFor="description" className="mb-2 mt-3">
              Category Description
            </label>
            <textarea
              value={des}
              onChange={(e) => setDes(e.target.value)}
              className="px-4 py-2 border focus:outline-none rounded-4"
              name="description"
              id="description"
              cols={5}
              rows={5}
            />
          </div>
          <div className="d-flex flex-column my-1 w-full">
            <label htmlFor="status" className="mb-2 mt-3">
              Category Status
            </label>
            <select
              value={status}
              name="status"
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 border focus:outline-none rounded-4"
              id="status"
            >
              <option name="status" value="Active">
                Active
              </option>
              <option name="status" value="Disabled">
                Disabled
              </option>
            </select>
          </div>
          <div className="d-flex flex-column mt-4 w-full pb-4 pb-md-5">
            <button
              onClick={(e) => submitForm()}
              className="rounded-5 bg-primary border-0 text-light text-lg fow-normal py-2"
            >
              Create categoryee
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditCategoryModal;
