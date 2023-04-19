import React, { Fragment, useContext, useState } from "react";
import { CategoryContext } from "./index";
import { createCategory, getAllCategory } from "./FetchApi";

const AddCategoryModal = (props) => {
  const { data, dispatch } = useContext(CategoryContext);

  const alert = (msg, type) => (
    <div className={`bg-success py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    cName: "",
    cDescription: "",
    cImage: "",
    cStatus: "Active",
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      dispatch({
        type: "fetchCategoryAndChangeState",
        payload: responseData.Categories,
      });
    }
  };

  if (fData.error || fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, success: false, error: false });
    }, 2000);
  }

  const submitForm = async (e) => {
    dispatch({ type: "loading", payload: true });
    // Reset and prevent the form
    e.preventDefault();
    e.target.reset();

    if (!fData.cImage) {
      dispatch({ type: "loading", payload: false });
      return setFdata({ ...fData, error: "Please upload a category image" });
    }

    try {
      let responseData = await createCategory(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          cName: "",
          cDescription: "",
          cImage: "",
          cStatus: "Active",
          success: responseData.success,
          error: false,
        });
        dispatch({ type: "loading", payload: false });
        setTimeout(() => {
          setFdata({
            ...fData,
            cName: "",
            cDescription: "",
            cImage: "",
            cStatus: "Active",
            success: false,
            error: false,
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        dispatch({ type: "loading", payload: false });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "addCategoryModal", payload: false })}
        className={`${
          data.addCategoryModal ? "" : "d-none"
        } position-fixed top-0 left-0 z-30 w-full h-full bg-secondary opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addCategoryModal ? "" : "d-none"
        } position-fixed inset-0 m-4 d-flex align-items-center z-30 justify-content-center`}
      >
        <div className="ms-start-5 rounded-5 position-relative bg-secondary w-12/12 md:w-3/6 shadow-lg d-flex flex-column align-items-end my-4 col-span-1 overflow-y-auto px-4 py-4">
          <div className="d-flex align-items-center justify-content-between w-full pt-4">
            <span className="text-left fw-semibold text-2xl tracking-wider text-light">
              Add Category
            </span>
            {/* Close Modal */}
            <span
              onClick={(e) =>
                dispatch({ type: "addCategoryModal", payload: false })
              }
              className="cursor-pointer text-light py-2 px-2 rounded-full"
            >
              <svg
                className="text-light cursor-pointer"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert(fData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="d-flex flex-column my-1 w-full py-4">
              <label htmlFor="name" className="mb-2 mt-3">
                Category Name
              </label>
              <input
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cName: e.target.value,
                  })
                }
                value={fData.cName}
                className="px-4 py-2 border focus:outline-none bg-transparent rounded-4 text-light"
                type="text"
              />
            </div>
            <div className="d-flex flex-column my-1 w-full">
              <label htmlFor="description" className="mb-2 mt-3">
                Category Description
              </label>
              <textarea
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cDescription: e.target.value,
                  })
                }
                value={fData.cDescription}
                className="px-4 py-2 border focus:outline-none bg-transparent rounded-4 text-light"
                name="description"
                id="description"
                cols={5}
                rows={5}
              />
            </div>
            {/* Image Field & function */}
            <div className="d-flex flex-column my-1 w-full">
              <label htmlFor="name" className="mb-2 mt-3">
                Category Image
              </label>
              <input
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cImage: e.target.files[0],
                  });
                }}
                className="px-4 py-2 border focus:outline-none bg-transparent rounded-4"
                type="file"
              />
            </div>
            <div className="d-flex flex-column my-1 w-full rounded-4">
              <label htmlFor="status" className="mb-2 mt-3">
                Category Status
              </label>
              <select
                name="status"
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cStatus: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none bg-secondary rounded-4 text-light"
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
            <div className="d-flex flex-column mt-4 w-full pb-4 pb-md-5 mt-4">
              <button
                type="submit"
                className="text-light rounded-5 text-lg fw-normal py-2 border-0 bg-primary"
              >
                Create category
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCategoryModal;
