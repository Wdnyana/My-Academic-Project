import React, { Fragment, useContext } from "react";
import { CategoryContext } from "./index";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const CategoryMenu = (props) => {
  const { dispatch } = useContext(CategoryContext);

  return (
    <Fragment>
      <div className="col-span-1 d-flex align-items-center">
        <div className="d-flex flex-column my-4 flex-md-row justify-content-md-between align-items-md-center w-full">
          {/* It's open the add category modal */}
          <div
            style={{ background: "#8363f0 !important" }}
            onClick={(e) =>
              dispatch({ type: "addCategoryModal", payload: true })
            }
            className="cursor-pointer rounded-full p-2 d-flex align-items-center justify-content-center text-light text-sm fw-semibold text-uppercase"
          >
            <svg
              className="text-secondary me-2 text-light"
              height="1.5rem"
              width="1.5rem"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Add Category
          </div>
        </div>
        <AddCategoryModal />
        <EditCategoryModal />
      </div>
    </Fragment>
  );
};

export default CategoryMenu;
